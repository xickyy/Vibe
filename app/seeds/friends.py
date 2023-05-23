from app.models import db, Friend, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_friends():
    link1 = Friend(
        friend_rank=0,
        user_id=1,
        friend_id=2)


    link2 = Friend(
        friend_rank=0,
        user_id=2,
        friend_id=1)

    link3 = Friend(
        friend_rank=0,
        user_id=1,
        friend_id=3)

    link4 = Friend(
        friend_rank=0,
        user_id=4,
        friend_id=3)

    link5 = Friend(
        friend_rank=0,
        user_id=3,
        friend_id=4)

    link6 = Friend(
        friend_rank=0,
        user_id=4,
        friend_id=1)

    db.session.add(link1)
    db.session.add(link2)
    db.session.add(link3)
    db.session.add(link4)
    db.session.add(link5)
    db.session.add(link6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
