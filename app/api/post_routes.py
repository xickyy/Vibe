from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Post, Friend, db
from flask_login import current_user
from ..forms.post_form import PostForm
import datetime


post_routes = Blueprint('posts', __name__)

@post_routes.route('/', methods=["GET"])
def all_posts():
    """
    Query for all users posts and users friends posts.
    """
    friends = Friend.query.filter(Friend.user_id == current_user.id).all()
    return {'friends': [friend.to_dict() for friend in friends]}


@post_routes.route('/', methods=["POST"])
def create_post():
    """
    Add a post to feed
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id = current_user.id,
            body = form.body.data,
            mood = form.mood.data,
            date = datetime.datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors" : "error"}
