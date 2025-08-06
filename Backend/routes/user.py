from flask import Blueprint, request, jsonify
from models import db, User
from utilis.auth_decorator import token_required, roles_required

user_bp = Blueprint("user_bp", __name__)

# Get all users (admin only)
@user_bp.route("/users", methods=["GET"])
@token_required
@roles_required(["admin"])
def get_all_users(current_user):
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

# Get specific user (admin or the user themselves)
@user_bp.route("/users/<int:user_id>", methods=["GET"])
@token_required
def get_user(current_user, user_id):
    user = User.query.get_or_404(user_id)
    if current_user.id != user.id and current_user.role != "admin":
        return jsonify({"error": "Access denied"}), 403
    return jsonify(user.to_dict()), 200

# Update user profile (the user themselves or admin)
@user_bp.route("/users/<int:user_id>", methods=["PUT"])
@token_required
def update_user(current_user, user_id):
    user = User.query.get_or_404(user_id)
    if current_user.id != user.id and current_user.role != "admin":
        return jsonify({"error": "Permission denied"}), 403

    data = request.json
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    if "role" in data and current_user.role == "admin":
        user.role = data["role"]

    db.session.commit()
    return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200

# Delete a user (admin only)
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
@token_required
@roles_required(["admin"])
def delete_user(current_user, user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
