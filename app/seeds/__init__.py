from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .payments import seed_payments, undo_payments
from .requests import seed_requests, undo_requests
from .socials import seed_socials, undo_socials

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_payments()
    seed_requests()
    seed_comments()
    seed_likes()
    seed_socials()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_socials()
    undo_likes()
    undo_comments()
    undo_requests()
    undo_payments()
    undo_users()
    # Add other undo functions here
