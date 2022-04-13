from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db


class Social(db.Model):
  __tablename__='socials'

  id = db.Column(Integer, primary_key=True)
  user1_id = db.Column(Integer, ForeignKey('user.id'), nullable=False)
  user2_id = db.Column(Integer, ForeignKey('user.id'), nullable=False)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'user1_id': self.user1_id,
      'user2_id': self.user2_id,
    }
