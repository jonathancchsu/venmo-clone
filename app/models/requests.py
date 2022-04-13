from xmlrpc.client import Boolean
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime, Float
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db


class Request(db.Model):
  __tablename__ = 'requests'

  id = db.Column(Integer, primary_key=True)
  sender_id = db.Column(Integer, ForeignKey('user.id'), nullable=False)
  receiver_id = db.Column(Integer, ForeignKey('user.id'), nullable=False)
  title = db.Column(String, nullable=False)
  amount = db.Column(Float, nullable=False)
  privacy = db.Column(String, nullable=False)
  completed = db.Column(Boolean, nullable=False)
  created_at = db.Column(DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'sender_id': self.sender_id,
      'receiver_id': self.receiver_id,
      'title': self.title,
      'amount': self.amount,
      'privacy': self.privacy,
      'completed': self.completed,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
    }
