from app.models import db, Comment

def seed_comments():
  comments = [
    {'owner_id': 1, 'payment_id': 1, 'content': 'yum yum 😋',},
    {'owner_id': 2, 'payment_id': 1, 'content': 'I want some too!',},
    {'owner_id': 1, 'payment_id': 2, 'content': 'Take me next time?',},
    {'owner_id': 2, 'payment_id': 5, 'content': 'boba 😍😍',},
    {'owner_id': 3, 'payment_id': 1, 'content': 'let\'s go together next time!',},
    {'owner_id': 3, 'payment_id': 3, 'content': 'How was it?',},
    {'owner_id': 2, 'payment_id': 4, 'content': 'celebrate!!!',},
    {'owner_id': 1, 'payment_id': 3, 'content': 'so gooodddd!',},
  ]

  for comment in comments:
    new_comment = Comment(
      owner_id = comment['owner_id'], payment_id = comment['payment_id'], content = comment['content'],
    )
    db.session.add(new_comment)
    db.session.commit()

def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
