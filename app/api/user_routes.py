from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Boolean, db
from app.forms import EditUserForm
from flask_login import current_user, login_user, logout_user, login_required

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def edit_user(user_id):
    """
    Edits a User by ID
    """
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(user_id)
        booleans = Boolean.query.get(user_id)

        if user is None:
            return {'errors': ['Product not found']}, 404

        user.username = form.username.data
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        user.profile_pic_url = form.profile_pic_url.data
        user.bio = form.bio.data
        user.zodiac = form.zodiac.data
        user.height = form.height.data
        user.relationship_status = form.relationship_status.data
        user.birthday = form.birthday.data
        user.motto = form.motto.data
        user.card_img_url = form.card_img_url.data
        user.profile_background_img_url = form.profile_background_img_url.data
        user.email = form.email.data
        user.text_color = form.text_color.data
        user.theme_color = form.theme_color.data
        user.trim_color = form.trim_color.data

        booleans.first_name_b = form.first_name_b.data
        booleans.last_name_b = form.last_name_b.data
        booleans.bio_b = form.bio_b.data
        booleans.birthday_b = form.birthday_b.data
        booleans.zodiac_b = form.zodiac_b.data
        booleans.height_b = form.height_b.data
        booleans.motto_b = form.motto_b.data
        booleans.card_b = form.card_b.data
        booleans.relationship_b = form.relationship_b.data
        booleans.background_b = form.background_b.data

        db.session.commit()
        return user.to_dict(), booleans.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@user_routes.route('/<int:user_id>', methods=['Delete'])
@login_required
def delete_user(user_id):
    """
    Deletes a user by ID.
    """
    product = User.query.get(user_id)
    db.session.delete(product)
    db.session.commit()
    return {'message': 'User has been deleted!'}
