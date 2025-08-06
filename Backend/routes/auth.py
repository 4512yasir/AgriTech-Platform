from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from models import db, User
import jwt
import datetime
from dotenv import load_dotenv
import os

load_dotenv()

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

SECRET_KEY = os.getenv("SECRET_KEY")


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not all(field in data for field in ("name", "email", "role", "password")):
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "User already exists"}), 409

    new_user = User(
        name=data["name"],
        email=data["email"],
        role=data["role"],
    )
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if user and check_password_hash(user.password, data["password"]):
        token = jwt.encode({
            "user_id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            },
            "token": token
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401
