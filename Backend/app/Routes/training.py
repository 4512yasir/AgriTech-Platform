from flask import Blueprint, request, jsonify
from app import db
from app.models import Training
from app.utilis.auth import token_required, roles_required

bp = Blueprint("training", __name__, url_prefix="/api/trainings")

@bp.route("/", methods=["POST"])
@token_required
@roles_required("admin", "agent")
def add_training(current_user):
    data = request.get_json()
    training = Training(
        title=data.get("title"),
        content=data.get("content"),
        delivery_method=data.get("delivery_method", "in-app"),
        created_by=current_user.id
    )
    db.session.add(training)
    db.session.commit()
    return jsonify({"message": "Training added successfully"}), 201

@bp.route("/", methods=["GET"])
@token_required
def view_trainings(current_user):
    trainings = Training.query.all()
    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "content": t.content,
            "delivery_method": t.delivery_method,
            "created_by": t.created_by
        } for t in trainings
    ])
