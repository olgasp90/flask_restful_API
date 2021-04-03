"""Models for Cupcake app."""
# import sqlAlchemy
from flask_sqlalchemy import SQLAlchemy

# execute sqlAlchemy
db = SQLAlchemy()

# connect db
def connect_db(app):
    db.app = app
    db.init_app(app)

# save the default image
DEFAULT_IMAGE = 'https://tinyurl.com/demo-cupcake'

class Cupcake(db.Model):
    # create table
    __tablename__ = 'cupcakes'
    # create columns
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.String, nullable=False, default=DEFAULT_IMAGE)


    def serialize(self):
        """Returns a dict representation of cupcake which we can turn into JSON"""
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }

    def __repr__(self):
        return f"This is a {self.zize} {self.flavor} cupcake that has a rating of {self.rating}"
