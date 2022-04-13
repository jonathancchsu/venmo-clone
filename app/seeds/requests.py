from app.models import db, Request

def seed_requests():
  requests = [
                {'sender_id': 1, 'receiver_id': 2, 'title': '🍜', 'amount': 9.50, 'privacy': 'public', 'completed': False,},
                {'sender_id': 1, 'receiver_id': 3, 'title': '🍣', 'amount': 10.00, 'privacy': 'public', 'completed': False,},
                {'sender_id': 2, 'receiver_id': 1, 'title': '🍰', 'amount': 5.95, 'privacy': 'public', 'completed': False,},
                {'sender_id': 2, 'receiver_id': 3, 'title': '🍾', 'amount': 200.00, 'privacy': 'public', 'completed': False,},
                {'sender_id': 3, 'receiver_id': 1, 'title': '🧋', 'amount': 6.95, 'privacy': 'public', 'completed': False,},
                {'sender_id': 3, 'receiver_id': 2, 'title': '⌨️', 'amount': 500.00, 'privacy': 'public', 'completed': False,},
              ]

  for request in requests:
    new_request = request(
      sender_id = request['sender_id'], receiver_id = request['receiver_id'], title = request['title'], amount = request['amount'], privacy = request['privacy'], completed = request['completed'],
    )
    db.session.add(new_request)
    db.session.commit()

def undo_requests():
  db.session.execute('TRUNCATE requests RESTART IDENTITY CASCADE;')
  db.sessin.commit()
