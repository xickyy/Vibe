from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Friend, db
from flask_login import current_user
from ..forms.friends_form import FriendForm


friend_routes = Blueprint('friends', __name__)

@friend_routes.route('/', methods=["GET"])
def friends():
    """
    Query for all friends.
    """
    friends = Friend.query.filter(Friend.user_id == current_user.id).all()
    return {'friends': [friend.to_dict() for friend in friends]}


@friend_routes.route('/', methods=["POST"])
def add_friend():
    """
    Add item to cart
    """
    form = FriendForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        friend = Friend(
            user_id = current_user.id,
            friend_id = form.friend_id.data,
            friend_rank = form.friend_rank.data
        )
        db.session.add(friend)
        db.session.commit()
        return friend.to_dict()
    return {"errors" : "error"}
