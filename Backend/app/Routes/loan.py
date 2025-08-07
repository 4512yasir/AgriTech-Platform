from flask import Blueprint, request, jsonify
from app import db
from app.models import Loan
from app.utils.auth import token_required, roles_required

bp = Blueprint("loan", __name__, url_prefix="/api/loans")

@bp.route("/", methods=["POST"])
@token_required
@roles_required("farmer")
def apply_for_loan(current_user):
    data = request.get_json()
    amount = data.get("amount")
    purpose = data.get("purpose")

    loan = Loan(farmer_id=current_user.id, amount=amount, purpose=purpose)
    db.session.add(loan)
    db.session.commit()

    return jsonify({"message": "Loan application submitted"}), 201

@bp.route("/", methods=["GET"])
@token_required
def view_loans(current_user):
    if current_user.role == "farmer":
        loans = Loan.query.filter_by(farmer_id=current_user.id).all()
    elif current_user.role in ["agent", "admin"]:
        loans = Loan.query.all()
    else:
        return jsonify({"message": "Unauthorized"}), 403

    return jsonify([
        {
            "id": l.id,
            "farmer_id": l.farmer_id,
            "amount": l.amount,
            "purpose": l.purpose,
            "status": l.status,
            "created_at": l.created_at
        } for l in loans
    ])

@bp.route("/<int:loan_id>/status", methods=["PUT"])
@token_required
@roles_required("agent", "admin")
def update_loan_status(current_user, loan_id):
    data = request.get_json()
    status = data.get("status")  # approved or rejected

    loan = Loan.query.get_or_404(loan_id)
    loan.status = status
    db.session.commit()

    return jsonify({"message": "Loan status updated"})
