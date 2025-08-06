from flask import Blueprint, request, jsonify
from models import db, Product, User
from flask_jwt_extended import jwt_required, get_jwt_identity

listing_bp = Blueprint("listing", __name__)

# Helper to serialize product
def product_to_dict(product):
    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "quantity": product.quantity,
        "created_at": product.created_at.isoformat(),
        "seller_id": product.seller_id,
    }

# Create a new product listing
@listing_bp.route("/api/listings", methods=["POST"])
@jwt_required()
def create_listing():
    user_id = get_jwt_identity()
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    quantity = data.get("quantity")

    if not all([name, description, price, quantity]):
        return jsonify({"error": "All fields are required"}), 400

    new_product = Product(
        name=name,
        description=description,
        price=price,
        quantity=quantity,
        seller_id=user_id,
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Listing created", "listing": product_to_dict(new_product)}), 201

# Get all product listings
@listing_bp.route("/api/listings", methods=["GET"])
def get_all_listings():
    products = Product.query.all()
    return jsonify([product_to_dict(p) for p in products]), 200

# Get a single listing by ID
@listing_bp.route("/api/listings/<int:listing_id>", methods=["GET"])
def get_listing(listing_id):
    product = Product.query.get_or_404(listing_id)
    return jsonify(product_to_dict(product)), 200

# Update a listing (only owner can update)
@listing_bp.route("/api/listings/<int:listing_id>", methods=["PUT"])
@jwt_required()
def update_listing(listing_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(listing_id)

    if product.seller_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    product.name = data.get("name", product.name)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.quantity = data.get("quantity", product.quantity)

    db.session.commit()
    return jsonify({"message": "Listing updated", "listing": product_to_dict(product)}), 200

# Delete a listing (only owner can delete)
@listing_bp.route("/api/listings/<int:listing_id>", methods=["DELETE"])
@jwt_required()
def delete_listing(listing_id):
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(listing_id)

    if product.seller_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Listing deleted"}), 200
