from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm


bp = Blueprint('requests', __name__, url_prefix='requests')
@bp.routes('/', methods=['POST'])
def request_create():
  data = request.json
  form = RequestForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    request = Request(
      sender_id=data['sender_id'],
      receiver_id=data['receiver_id'],
      title=data['title'],
      amount=data['amount'],
      privacy=data['privacy'],
      completed=data['completed'],
    )
    db.session.add(request)
    db.session.commit()
