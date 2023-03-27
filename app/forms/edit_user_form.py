from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Boolean
from flask_login import current_user


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and not(current_user.id == user.id):
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and not(current_user.id == user.id):
        raise ValidationError('Username is already in use.')

zodiacs = ['Rather not say', 'Aquarius', 'Capricorn', 'Sagittarius', 'Scorpio', 'Libra', 'Virgo', 'Leo', 'Cancer', 'Gemini', 'Taurus', 'Aries', 'Pisces']

class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    first_name = StringField('First Name')
    last_name = StringField('Last Name')
    profile_pic_url = StringField('Profile Picture Url')
    bio = StringField('Bio')
    zodiac = StringField('Zodiac Sign')
    height = StringField('Height')
    relationship_status = StringField('Relationship Status')
    birthday = StringField('Birthday')
    motto = StringField('Motto')
    card_img_url = StringField('Profile Card Url')
    profile_background_img_url = StringField('Profile Background Image Url')
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password')
    text_color = StringField('color')
    theme_color = StringField('color')
    trim_color = StringField('color')

    first_name_b = BooleanField(False)
    last_name_b = BooleanField(False)
    bio_b = BooleanField(False)
    birthday_b = BooleanField(False)
    zodiac_b = BooleanField(False)
    height_b = BooleanField(False)
    motto_b = BooleanField(False)
    card_b = BooleanField(False)
    relationship_b = BooleanField(False)
    background_b = BooleanField(False)
