from flask import Blueprint, request, jsonify
from models import db, Order, Product, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

order_bp = Blueprint("order", __name__)

# Create an order
@order_bp.route("/api/orders", methods=["POST"])
@jwt_required()
def create_order():
    buyer_id = get_jwt_identity()
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not all([product_id, quantity]):
        return jsonify({"error": "Product and quantity are required"}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    if product.quantity < quantity:
        return jsonify({"error": "Not enough stock available"}), 400

    total_price = quantity * product.price
    order = Order(
        buyer_id=buyer_id,
        product_id=product_id,
        quantity=quantity,
        total_price=total_price,
        status="pending",
        order_date=datetime.utcnow()
    )

    product.quantity -= quantity  # reduce stock
    db.session.add(order)
    db.session.commit()

    return jsonify({"message": "Order placed", "order": order.to_dict()}), 201

# Get all orders for the logged-in user
@order_bp.route("/api/orders", methods=["GET"])
@jwt_required()
def get_user_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(buyer_id=user_id).all()
    return jsonify([order.to_dict() for order in orders]), 200

# Get a single order by ID
@order_bp.route("/api/orders/<int:order_id>", methods=["GET"])
@jwt_required()
def get_order(order_id):
    user_id = get_jwt_identity()
    order = Order.query.get_or_404(order_id)

    if order.buyer_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    return jsonify(order.to_dict()), 200

# Admin/Agent can update order status (delivered, cancelled, etc.)
@order_bp.route("/api/orders/<int:order_id>", methods=["PUT"])
@jwt_required()
def update_order_status(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role.lower() not in ["admin", "agent"]:
        return jsonify({"error": "Only admin or agent can update orders"}), 403

    data = request.get_json()
    status = data.get("status")

    if not status:
        return jsonify({"error": "Status is required"}), 400

    order = Order.query.get_or_404(order_id)
    order.status = status
    db.session.commit()

    return jsonify({"message": "Order status updated", "order": order.to_dict()}), 200
