from flask import Blueprint, request, jsonify
from app import db
from app.models import Product
from app.utilis.auth import token_required, roles_required

bp = Blueprint("listing", __name__, url_prefix="/api/listings")

@bp.route("/", methods=["GET"])
def get_all_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "category": p.category,
            "price": p.price,
            "quantity": p.quantity,
            "location": p.location,
            "image_url": p.image_url,
            "farmer_id": p.farmer_id
        }
        for p in products
    ])

@bp.route("/", methods=["POST"])
@token_required
@roles_required("farmer")
def create_product(current_user):
    data = request.get_json()
    product = Product(
        title=data.get("title"),
        description=data.get("description"),
        category=data.get("category"),
        price=data.get("price"),
        quantity=data.get("quantity"),
        location=data.get("location"),
        image_url=data.get("image_url"),
        farmer_id=current_user.id
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product listed successfully"}), 201

@bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "category": product.category,
        "price": product.price,
        "quantity": product.quantity,
        "location": product.location,
        "image_url": product.image_url,
        "farmer_id": product.farmer_id
    })

@bp.route("/<int:product_id>", methods=["PUT"])
@token_required
@roles_required("farmer")
def update_product(current_user, product_id):
    product = Product.query.get_or_404(product_id)
    if product.farmer_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    for field in ["title", "description", "category", "price", "quantity", "location", "image_url"]:
        if field in data:
            setattr(product, field, data[field])

    db.session.commit()
    return jsonify({"message": "Product updated"})

@bp.route("/<int:product_id>", methods=["DELETE"])
@token_required
@roles_required("farmer")
def delete_product(current_user, product_id):
    product = Product.query.get_or_404(product_id)
    if product.farmer_id != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})
