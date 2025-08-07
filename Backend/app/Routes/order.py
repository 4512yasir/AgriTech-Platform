from flask import Blueprint, request, jsonify
from app import db
from app.models import Order, Product
from app.utils.auth import token_required, roles_required

bp = Blueprint("order", __name__, url_prefix="/api/orders")

@bp.route("/", methods=["GET"])
@token_required
def get_all_orders(current_user):
    if current_user.role == "buyer":
        orders = Order.query.filter_by(buyer_id=current_user.id).all()
    elif current_user.role in ["admin", "agent"]:
        orders = Order.query.all()
    else:
        return jsonify({"message": "Unauthorized"}), 403

    return jsonify([
        {
            "id": o.id,
            "product_id": o.product_id,
            "product_title": o.product.title,
            "quantity": o.quantity,
            "total_price": o.total_price,
            "status": o.status,
            "buyer_id": o.buyer_id
        }
        for o in orders
    ])

@bp.route("/", methods=["POST"])
@token_required
@roles_required("buyer")
def create_order(current_user):
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    product = Product.query.get(product_id)
    if not product or quantity > product.quantity:
        return jsonify({"message": "Invalid quantity or product not available"}), 400

    total_price = quantity * product.price
    order = Order(
        buyer_id=current_user.id,
        product_id=product_id,
        quantity=quantity,
        total_price=total_price
    )
    product.quantity -= quantity
    db.session.add(order)
    db.session.commit()
    return jsonify({"message": "Order placed successfully"}), 201

@bp.route("/<int:order_id>/status", methods=["PUT"])
@token_required
@roles_required("admin", "agent")
def update_order_status(current_user, order_id):
    data = request.get_json()
    status = data.get("status")  # approved, rejected, delivered

    order = Order.query.get_or_404(order_id)
    order.status = status
    db.session.commit()
    return jsonify({"message": "Order status updated"})
