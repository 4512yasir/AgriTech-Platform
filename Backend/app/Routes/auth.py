from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_bcrypt import Bcrypt
from app.utilis.auth import generate_token

bp = Blueprint("auth", __name__, url_prefix="/api/auth")
bcrypt = Bcrypt()

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")  # 'farmer', 'buyer', 'agent', 'admin'

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(full_name=full_name, email=email, password=hashed_pw, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = generate_token(user)
    return jsonify({"token": token, "user": {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role
    }})
