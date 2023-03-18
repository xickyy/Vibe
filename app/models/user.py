from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    profile_pic_url = db.Column(db.String)
    bio = db.Column(db.String(1000))
    zodiac = db.Column(db.String(40))
    height = db.Column(db.String(20))
    relationship_status = db.Column(db.String)
    birthday = db.Column(db.String(20))
    motto = db.Column(db.String(255))
    card_img_url = db.Column(db.String)
    profile_background_img_url = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    friends = db.relationship("Friend", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'profilePicUrl': self.profile_pic_url,
            'bio': self.bio,
            'zodiac': self.zodiac,
            'height': self.height,
            'relationshipStatus': self.relationship_status,
            'birthday': self.birthday,
            'motto': self.motto,
            'cardImgUrl': self.card_img_url,
            'profileBackgroundImgUrl': self.profile_background_img_url,
            'email': self.email
        }
