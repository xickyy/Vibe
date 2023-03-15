from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_pic_url=form.data['profile_pic_url'],
            bio=form.data['bio'],
            zodiac=form.data['zodiac'],
            height=form.data['height'],
            relationship_status=form.data['relationship_status'],
            birthday=form.data['birthday'],
            motto=form.data['motto'],
            card_img_url=form.data['card_img_url'],
            profile_background_img_url=form.data['profile_background_img_url'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/user/<int:user_id>', methods=['PUT'])
@login_required
def edit_user(user_id):
    """
    Edits a User by ID
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(user_id)

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

        db.session.commit()
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@auth_routes.route('/user/<int:user_id>', methods=['Delete'])
@login_required
def delete_user(user_id):
    """
    Deletes a user by ID.
    """
    product = User.query.get(user_id)
    db.session.delete(product)
    db.session.commit()
    return {'message': 'User has been deleted!'}

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
