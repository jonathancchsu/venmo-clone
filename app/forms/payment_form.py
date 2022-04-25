from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def length(min=-1, max=-1):
    message = 'Must be between %d and %d characters long.' % (min, max)

    def _length(form, field):
        l = field.data and len(field.data) or 0
        if l < min or max != -1 and l > max:
            raise ValidationError(message)

    return _length

def user_exists(form, field):
    # Checking if user exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('User provided not found.')

class PaymentlForm(FlaskForm):
    title = StringField(
        'title', validators=[DataRequired(), length(max=50)])
    privacy = StringField(
        'privacy', validators=[DataRequired(), length(max=10)])
