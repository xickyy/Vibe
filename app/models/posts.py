from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    mood = db.Column(db.String(40), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'mood': self.mood
        }
