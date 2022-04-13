from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db


class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
  payment_id = db.Column(Integer, ForeignKey('payments.id', nullable=False))
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'payment_id': self.payment_id,
      'created_at': self.created_at
    }
