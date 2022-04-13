from app.models import db, Payment

def seed_payments():
  payments = [{'sender_id': 1, 'receiver_id': 2, 'title': '🍜', 'amount': 9.50},
              {'sender_id': 1, 'receiver_id': 3, 'title': '🍣', 'amount': 10.00},
              {'sender_id': 2, 'receiver_id': 1, 'title': '🍰', 'amount': 5.95},
              {'sender_id': 2, 'receiver_id': 3, 'title': '🍾', 'amount': 200.00},
              {'sender_id': 3, 'receiver_id': 1, 'title': '🧋', 'amount': 6.95},
              {'sender_id': 3, 'receiver_id': 2, 'title': '⌨️', 'amount': 500.00},]

  for payment in payments:
    new_payment = Payment(
      sender_id = payment['sender_id'], receiver_id = payment['receiver_id'], title = payment['title'], amount = payment['amount'],
    )
    db.session.add(new_payment)
    db.session.commit()

def undo_payments():
  db.session.execute('TRUNCATE payments RESTART IDENTITY CASCADE;')
  db.sessin.commit()
