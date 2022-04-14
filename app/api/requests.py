from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm


bp = Blueprint('requests', __name__, url_prefix='requests')
@bp.routes('/', methods=['GET', 'POST'])
def request_get_post():
  if request.method == 'GET':
    requests = Request.query.all()
    return [{request.to_dict() for request in requests}]

  if request.method == 'POST':
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
      return request.to_dict()


@bp.routes('/<int:request_id>', methods=['PUT', 'DELETE'])
def request_put_delete(request_id):
  if request.method == 'PUT':
    data = request.json
    request = Request.query.get(data['id'])
    request.title=data['title']
    request.amount=data['amount']
    request.privacy=data['privacy']
    db.session.commit()
    return request.to_dict()

  if request.method == 'DELETE':
    request = Request.query.get(request_id)
    db.session.delete(request)
    db.session.commit()
    return {'request_id': request_id}
