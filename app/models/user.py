from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session
from alembic import op
from sqlalchemy.orm import Session


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    liked_post = relationship('Like', backref='owner', cascade='all, delete')
    payments_created = relationship('Payment', backref='sender', cascade='all, delete')
    requests_created = relationship('Request', backref='receiver', cascade='all, delete')
    friends = relationship('Social', backref='friend', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'liked_post': [
                {},
            ]
        }
