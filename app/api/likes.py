from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm


bp = Blueprint('likes', __name__)
@bp.route('/', methods=['POST'])
def likes_post():
    data = request.json
    like = Like(
      user_id=data['user_id'],
      payment_id=data['payment_id']
    )
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@bp.route('/<int:like_id>', methods=['DELETE'])
def likes_delete(like_id):
  request_data = Like.query.get(like_id)
  db.session.delete(request_data)
  db.session.commit()
  return {'like_id': like_id}
