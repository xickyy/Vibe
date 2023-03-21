from flask_wtf import FlaskForm
from wtforms import  SubmitField, IntegerField, DateTimeField, StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    body = StringField('body', validators=[DataRequired()])
    mood = StringField('mood')
    date = DateTimeField('date')
    submit = SubmitField('Submit')
