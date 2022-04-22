from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm


bp = Blueprint('requests', __name__)
@bp.route('/', methods=['GET', 'POST'])
def request_get_post():
  if request.method == 'GET':
    # requests = Request.query.filter(Request.receiver_id == current_user.id)
    requestsData = Request.query.all()
    return {'requests': [request.to_dict() for request in requestsData]}

  if request.method == 'POST':
    data = request.json
    form = RequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    receiver = User.query.filter(User.username == data['receiverName']).first()
    if form.validate_on_submit():
      request_data = Request(
        sender_id=data['sender_id'],
        receiver_id=receiver.id,
        title=data['title'],
        amount=data['amount'],
        privacy=data['privacy'],
      )
      db.session.add(request_data)
      db.session.commit()
      return request_data.to_dict()


@bp.route('/<int:request_id>', methods=['PUT', 'DELETE'])
def request_put_delete(request_id):
  if request.method == 'PUT':
    data = request.json
    request_data = Request.query.get(data['id'])
    request_data.title=data['title']
    request_data.amount=data['amount']
    request_data.privacy=data['privacy']
    db.session.commit()
    return request.to_dict()

  if request.method == 'DELETE':
    request_data = Request.query.get(request_id)
    db.session.delete(request_data)
    db.session.commit()
    return {'request_id': request_id}
