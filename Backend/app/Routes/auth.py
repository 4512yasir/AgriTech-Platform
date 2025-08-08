from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_bcrypt import Bcrypt
from app.utilis.auth import generate_token

# Create Blueprint
bp = Blueprint("auth", __name__, url_prefix="/api/auth")
bcrypt = Bcrypt()

# REGISTER ROUTE
@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print("🚀 Incoming register payload:", data) 

    # Extract data
    full_name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")  # Expected values: 'farmer', 'buyer', 'agent', 'admin'

    # Validate all fields are provided
    if not all([full_name, email, password, role]):
        return jsonify({"message": "All fields (full_name, email, password, role) are required."}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered."}), 400

    # Hash password
    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")

    # Create user
    new_user = User(
        full_name=full_name,
        email=email,
        password=hashed_pw,
        role=role
    )

    # Save to DB
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully."}), 201

# LOGIN ROUTE
@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    # Extract login credentials
    email = data.get("email")
    password = data.get("password")

    # Find user by email
    user = User.query.filter_by(email=email).first()

    # Verify credentials
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials."}), 401

    # Generate JWT token
    token = generate_token(user)

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }), 200
