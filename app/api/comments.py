from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm


bp = Blueprint('comments', __name__)
@bp.route('/', methods=['GET', 'POST'])
def comments_get_post():
  if request.method == 'GET':
    comments = Comment.query.all()
    return [{comment.todict() for comment in comments}]

  if request.method == 'POST':
    data = request.json
    comment = Comment(
      owner_id=data['owner_id'],
      payment_id=data['payment_id'],
      content=data['content'],
    )
    db.session.save(comment)
    db.session.commit()
    return comment.to_dict()

@bp.route('/<int:comment_id>', methods=['PUT', 'DELETE'])
def comments_put_delete(comment_id):
  if request.method == 'PUT':
    data = request.json
    comment = Comment.query.get(comment_id)
    comment.content = data['content']
    db.session.commit()
    return comment.to_dict()

  if request.method == 'DELETE':
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {'comment_id': comment_id}
