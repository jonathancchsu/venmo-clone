from app.models import db, Social

def seed_socials():
  socials = [
    {'user1_id': 1, 'user2_id': 2},
    {'user1_id': 1, 'user2_id': 3},
    {'user1_id': 2, 'user2_id': 3},
  ]

  for social in socials:
    new_social = Social(
      user1_id = social['user1_id'], user2_id = social['user2_id']
    )
    db.session.add(new_social)
    db.session.commit()

def undo_socials():
  db.session.execute('TRUNCATE socials RESTART IDENTITY CASCADE;')
  db.session.commit()
