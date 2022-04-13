from app.models import db, Like

def seed_likes():
  likes = [
            {'user_id': 1, 'payment_id': 1},
            {'user_id': 1, 'payment_id': 2},
            {'user_id': 1, 'payment_id': 3},
            {'user_id': 1, 'payment_id': 4},
            {'user_id': 1, 'payment_id': 5},
            {'user_id': 1, 'payment_id': 6},
            {'user_id': 2, 'payment_id': 1},
            {'user_id': 3, 'payment_id': 1},
            {'user_id': 3, 'payment_id': 2},
            {'user_id': 3, 'payment_id': 5},
            {'user_id': 3, 'payment_id': 6},
          ]

  for like in likes:
    new_like = Like(
      user_id = like['user_id'], payment_id = like['payment_id'],
    )
    db.session.add(new_like)
    db.session.commit()

def undo_likes():
  db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
  db.session.commit()
