from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db


class Comment(db.Model):
  __tablename__='comments'

  id = db.Column(Integer, primary_key=True)
  owner_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
  payment_id = db.Column(Integer, ForeignKey('payments.id'), nullable=False)
  content = db.Column(String, nullable=False)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'owner_id': self.owner_id,
      'payment_id': self.payment_id,
      'content': self.content,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
    }
