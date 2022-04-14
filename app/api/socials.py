from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm

bp = Blueprint('socials', __name__, url_prefix='socials')
@bp.route('/', methods=['GET', 'POST'])
def socials():
  data = request.json
  social = Social(
    user1_id=data['user1_id'],
    user2_id=data['user2_id']
  )
  db.session.add(social)
  db.session.commit()

@bp.routes('/<int:social_id>', methods=['DELETE'])
def socials_delete(social_id):
  social = Social.query.get(social_id)
  db.session.delete(social)
  db.session.commit()
  return {'social_id': social_id}
