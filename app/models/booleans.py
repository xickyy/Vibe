from .db import db, environment, SCHEMA, add_prefix_for_prod

class Boolean(db.Model):
    __tablename__ = 'booleans'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name_b = db.Column(db.Boolean)
    last_name_b = db.Column(db.Boolean)
    bio_b = db.Column(db.Boolean)
    birthday_b = db.Column(db.Boolean)
    zodiac_b = db.Column(db.Boolean)
    height_b = db.Column(db.Boolean)
    motto_b = db.Column(db.Boolean)
    card_b = db.Column(db.Boolean)
    relationship_b = db.Column(db.Boolean)
    background_b = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    user = db.relationship("User", back_populates="booleans")


    def to_dict(self):
      return {
          'id': self.id,
          'firstNameB': self.first_name_b,
          'lastNameB': self.last_name_b,
          'bioB': self.bio_b,
          'birthdayB': self.birthday_b,
          'zodiacB': self.zodiac_b,
          'heightB': self.height_b,
          'mottoB': self.motto_b,
          'cardB': self.card_b,
          'relationshipB': self.relationship_b,
          'backgroundB': self.background_b,
          'userId': self.user_id,
        #   'user': self.user.to_dict()
      }
