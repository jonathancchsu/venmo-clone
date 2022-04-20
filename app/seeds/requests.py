from app.models import db, Request

def seed_requests():
  requests = [
    {'sender_id': 1, 'receiver_id': 2, 'title': 'ktown', 'amount': "30.50", 'privacy': 'public',},
    {'sender_id': 1, 'receiver_id': 3, 'title': 'coffee', 'amount': '3.00', 'privacy': 'public',},
    {'sender_id': 2, 'receiver_id': 1, 'title': 'lunch', 'amount': "9.95", 'privacy': 'public',},
    {'sender_id': 2, 'receiver_id': 3, 'title': 'wine', 'amount': "200.00", 'privacy': 'public',},
    {'sender_id': 3, 'receiver_id': 1, 'title': 'boba', 'amount': "6.95", 'privacy': 'public',},
    {'sender_id': 3, 'receiver_id': 2, 'title': 'watch', 'amount': "500.00", 'privacy': 'public',},
  ]

  for request in requests:
    new_request = Request(
      sender_id = request['sender_id'], receiver_id = request['receiver_id'], title = request['title'], amount = request['amount'], privacy = request['privacy'],
    )
    db.session.add(new_request)
    db.session.commit()

def undo_requests():
  db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
  db.session.commit()
