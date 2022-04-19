from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm

bp = Blueprint('payments', __name__)
@bp.route('/', methods=['GET', 'POST'])
def payment_get_post():
  if request.method == 'GET':
    payments = Payment.query.all()
    return {'payments': [payment.to_dict() for payment in payments]}

  if request.method == 'POST':
    data = request.json
    form = RequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    receiver = User.query.filter(User.username == data['receiverName']).first()
    if form.validate_on_submit():
      payment = Payment (
        sender_id=data['sender_id'],
        receiver_id=receiver.id,
        title=data['title'],
        amount=data['amount'],
        privacy=data['privacy'],
      )
      db.session.add(payment)
      db.session.commit()

      receiver = User.query.get(payment.receiver_id)
      receiver.balance += data['amount']
      sender = User.query.get(payment.sender_id)
      sender.balance -= data['amount']
      db.sesison.commit()
      return payment.to_dict()

@bp.route('/<int:payment_id>', methods=['GET', 'PUT'])
def payment_put(payment_id):
  if request.method == 'GET':
    payment = Payment.query.get(payment_id)
    return payment.to_dict()

  if request.method == 'PUT':
    data = request.json
    payment = Payment.query.get(data['id'])
    payment.title = data['title']
    db.session.commit()
    return payment.to_dict()
