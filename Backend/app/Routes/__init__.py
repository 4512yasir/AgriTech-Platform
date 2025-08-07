from . import auth, user, listing, order, loan, training, logistics,insight

def register_routes(app):
    app.register_blueprint(auth.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(listing.bp)
    app.register_blueprint(order.bp)
    app.register_blueprint(loan.bp)
    app.register_blueprint(training.bp)
    app.register_blueprint(logistics.bp)
    app.register_blueprint(insight.bp)
