from flask import Blueprint, render_template, redirect, url_for, request
from app.models import Comment, Like, Payment, Request, Social, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import LoginForm, PaymentlForm, RequestForm, SignUpForm

bp = Blueprint('payments', __name__, url_prefix='payments')
@bp.routes('/', methods=['GET', 'POST'])
def payment_get_post():
  if request.method == 'GET':
    payment = Payment.query.all()
    return payment.to_dict()

  if request.method == 'POST':
    data = request.json
    form = RequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      payment = Payment (
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        title=data['title'],
        amount=data['amount'],
        privacy=data['privacy'],
      )
      db.session.add(payment)
      db.session.commit

@bp.routes('/<int:payment_id>', methods=['PUT', 'DELETE'])
def payment_put_delete(payment_id):
  if request.method == 'PUT':
    data = request.json
    payment = Payment.query.get(data['id'])
    payment.title = data['title']
    db.session.commit()

    return payment.to_dict()

  if request.method == 'DELETE':
    payment = Payment.query.get(payment_id)
    db.session.delete(payment)
    db.session.commit()

    return {'payment_id': payment_id}
