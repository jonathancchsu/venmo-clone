from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db


class Requests(db.Model):
  __tablename__ = 'requests'

  id = db.Column(Integer, primary_key=True)
  
