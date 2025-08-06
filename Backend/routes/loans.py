from flask import Blueprint, request, jsonify
from models import db, Loan, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

loans_bp = Blueprint("loans", __name__)

# Request a new loan (Farmers only)
@loans_bp.route("/api/loans", methods=["POST"])
@jwt_required()
def request_loan():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() != "farmer":
        return jsonify({"error": "Only farmers can request loans"}), 403

    data = request.get_json()
    amount = data.get("amount")
    reason = data.get("reason")

    if not all([amount, reason]):
        return jsonify({"error": "Amount and reason are required"}), 400

    new_loan = Loan(
        farmer_id=user.id,
        amount=amount,
        reason=reason,
        status="pending",
        request_date=datetime.utcnow()
    )
    db.session.add(new_loan)
    db.session.commit()

    return jsonify({"message": "Loan request submitted", "loan": new_loan.to_dict()}), 201

# Get all loan requests (admin/agent only)
@loans_bp.route("/api/loans", methods=["GET"])
@jwt_required()
def get_all_loans():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() not in ["admin", "agent"]:
        return jsonify({"error": "Only admins or agents can view loans"}), 403

    loans = Loan.query.all()
    return jsonify([loan.to_dict() for loan in loans]), 200

# Get loans of the logged-in farmer
@loans_bp.route("/api/loans/my", methods=["GET"])
@jwt_required()
def get_my_loans():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() != "farmer":
        return jsonify({"error": "Only farmers can view their loans"}), 403

    loans = Loan.query.filter_by(farmer_id=user.id).all()
    return jsonify([loan.to_dict() for loan in loans]), 200

# Approve or reject a loan
@loans_bp.route("/api/loans/<int:loan_id>", methods=["PUT"])
@jwt_required()
def update_loan_status(loan_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() not in ["admin", "agent"]:
        return jsonify({"error": "Only admins or agents can update loan status"}), 403

    loan = Loan.query.get_or_404(loan_id)
    data = request.get_json()
    status = data.get("status")

    if status not in ["approved", "rejected"]:
        return jsonify({"error": "Status must be 'approved' or 'rejected'"}), 400

    loan.status = status
    db.session.commit()

    return jsonify({"message": "Loan status updated", "loan": loan.to_dict()}), 200
