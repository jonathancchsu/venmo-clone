"""empty message

Revision ID: 4e6a0eac3da2
Revises: 9769f60e7144
Create Date: 2022-04-19 06:30:01.275551

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e6a0eac3da2'
down_revision = '9769f60e7144'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('requests', 'completed')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('requests', sa.Column('completed', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###