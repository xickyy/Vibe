from flask import Blueprint, jsonify, redirect, render_template, request
from app.models import Post, db
from flask_login import current_user
from ..forms.post_form import PostForm


post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=["POST"])
def add_friend():
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
            date = form.date.data
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors" : "error"}
