from flask import Blueprint, request, jsonify
from app import db
from app.models import LogisticsRequest
from app.utils.auth import token_required, roles_required

bp = Blueprint("logistics", __name__, url_prefix="/api/logistics")

@bp.route("/", methods=["POST"])
@token_required
@roles_required("farmer")
def create_logistics_request(current_user):
    data = request.get_json()

    logistics = LogisticsRequest(
        farmer_id=current_user.id,
        request_type=data.get("request_type"),
        origin=data.get("origin"),
        destination=data.get("destination"),
        item_description=data.get("item_description")
    )
    db.session.add(logistics)
    db.session.commit()
    return jsonify({"message": "Logistics request submitted"}), 201

@bp.route("/", methods=["GET"])
@token_required
def get_logistics_requests(current_user):
    if current_user.role == "farmer":
        requests = LogisticsRequest.query.filter_by(farmer_id=current_user.id).all()
    elif current_user.role in ["admin", "agent"]:
        requests = LogisticsRequest.query.all()
    else:
        return jsonify({"message": "Unauthorized"}), 403

    return jsonify([
        {
            "id": r.id,
            "farmer_id": r.farmer_id,
            "request_type": r.request_type,
            "origin": r.origin,
            "destination": r.destination,
            "item_description": r.item_description,
            "status": r.status
        } for r in requests
    ])

@bp.route("/<int:request_id>/status", methods=["PUT"])
@token_required
@roles_required("agent", "admin")
def update_logistics_status(current_user, request_id):
    data = request.get_json()
    status = data.get("status")  # accepted, rejected, completed

    logistics = LogisticsRequest.query.get_or_404(request_id)
    logistics.status = status
    db.session.commit()
    return jsonify({"message": "Logistics status updated"})
