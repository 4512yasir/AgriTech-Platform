from flask import Blueprint, request, jsonify
from models import db, Training, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

training_bp = Blueprint("training", __name__)

# Create a new training course (Admin/Agent only)
@training_bp.route("/api/training", methods=["POST"])
@jwt_required()
def create_training():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() not in ["admin", "agent"]:
        return jsonify({"error": "Only admins or agents can add training"}), 403

    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    date = data.get("date")

    if not all([title, description, date]):
        return jsonify({"error": "Title, description, and date are required"}), 400

    new_training = Training(
        title=title,
        description=description,
        date=datetime.strptime(date, "%Y-%m-%d")
    )
    db.session.add(new_training)
    db.session.commit()

    return jsonify({"message": "Training created successfully", "training": new_training.to_dict()}), 201

# Get all trainings (accessible to all roles)
@training_bp.route("/api/training", methods=["GET"])
@jwt_required()
def get_all_trainings():
    trainings = Training.query.order_by(Training.date.desc()).all()
    return jsonify([training.to_dict() for training in trainings]), 200

# Get a single training by ID
@training_bp.route("/api/training/<int:training_id>", methods=["GET"])
@jwt_required()
def get_training(training_id):
    training = Training.query.get_or_404(training_id)
    return jsonify(training.to_dict()), 200

# Update a training (Admin/Agent only)
@training_bp.route("/api/training/<int:training_id>", methods=["PUT"])
@jwt_required()
def update_training(training_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() not in ["admin", "agent"]:
        return jsonify({"error": "Only admins or agents can update training"}), 403

    training = Training.query.get_or_404(training_id)
    data = request.get_json()

    training.title = data.get("title", training.title)
    training.description = data.get("description", training.description)
    if data.get("date"):
        training.date = datetime.strptime(data["date"], "%Y-%m-%d")

    db.session.commit()
    return jsonify({"message": "Training updated", "training": training.to_dict()}), 200

# Delete a training (Admin/Agent only)
@training_bp.route("/api/training/<int:training_id>", methods=["DELETE"])
@jwt_required()
def delete_training(training_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() not in ["admin", "agent"]:
        return jsonify({"error": "Only admins or agents can delete training"}), 403

    training = Training.query.get_or_404(training_id)
    db.session.delete(training)
    db.session.commit()

    return jsonify({"message": "Training deleted successfully"}), 200
