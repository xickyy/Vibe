from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    friend_rank = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # user = relationship("User", foreign_keys="Friend.user_id")
    # friend = relationship("User", foreign_keys="Friend.friend_id")

    user = relationship("User", foreign_keys=[user_id])
    friend = relationship("User", foreign_keys=[friend_id])



    def to_dict(self):
        return {
            'id': self.id,
            'friendRank': self.friend_rank,
            'friendId': self.friend_id,
            'userId': self.user_id
        }
