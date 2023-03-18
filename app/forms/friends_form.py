from flask_wtf import FlaskForm
from wtforms import  SubmitField, IntegerField

class FriendForm(FlaskForm):
    friend_id = IntegerField('')
    friend_rank = IntegerField('')
    submit = SubmitField('Submit')
