from flask_wtf import FlaskForm
from wtforms import  SubmitField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    body = IntegerField('', validators=[DataRequired()])
    mood = IntegerField('')
    date = DateTimeField('')
    submit = SubmitField('Submit')
