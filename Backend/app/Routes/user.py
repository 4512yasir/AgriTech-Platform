from flask import Blueprint, request, jsonify
from app.models import User
from app.utils.auth import token_required, roles_required
from app import db
from flask_bcrypt import Bcrypt

bp = Blueprint("user", __name__, url_prefix="/api/users")
bcrypt = Bcrypt()

# Get all users (admin/agent only)
@bp.route("/", methods=["GET"])
@token_required
@roles_required("admin", "agent")
def get_all_users(current_user):
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at
        } for u in users
    ])

# Get single user (self or admin/agent)
@bp.route("/<int:user_id>", methods=["GET"])
@token_required
def get_user(current_user, user_id):
    user = User.query.get_or_404(user_id)
    if current_user.role not in ["admin", "agent"] and current_user.id != user.id:
        return jsonify({"message": "Unauthorized"}), 403
    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
        "created_at": user.created_at
    })

# Update user (admin updates any, user updates own)
@bp.route("/<int:user_id>", methods=["PUT"])
@token_required
def update_user(current_user, user_id):
    user = User.query.get_or_404(user_id)
    if current_user.role not in ["admin", "agent"] and current_user.id != user.id:
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    user.full_name = data.get("full_name", user.full_name)
    user.email = data.get("email", user.email)

    if "password" in data:
        user.password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    if current_user.role in ["admin", "agent"]:
        user.role = data.get("role", user.role)

    db.session.commit()
    return jsonify({"message": "User updated"})

# Delete user (admin only)
@bp.route("/<int:user_id>", methods=["DELETE"])
@token_required
@roles_required("admin")
def delete_user(current_user, user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})
