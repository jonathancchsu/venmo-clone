from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def name_exists(form, field):
    # Checking if name is already in use
    name = field.data
    user = User.query.filter(User.name == name).first()
    if user:
        raise ValidationError('Name is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    name = StringField('name', validators=[DataRequired(), name_exists])
    password = StringField('password', validators=[DataRequired(), EqualTo('confirmed_password', message='Please match your passwords.')])
    confirmed_password = StringField('confirmed_password', validators=[DataRequired()])
