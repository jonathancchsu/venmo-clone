from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm


bp = Blueprint('likes', __name__)
@bp.route('/payments/<int:payment_id>', methods=['GET', 'POST'])
def likes(payment_id):
  if request.method == 'GET':
    likes = Like.query.filter(Like.payment_id == payment_id).all()
    return {'likes': [like.to_dict() for like in likes]}
    
  if request.method == 'POST':
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
  like = Like.query.get(like_id)
  db.session.delete(like)
  db.session.commit()
  return {'like_id': like_id}
