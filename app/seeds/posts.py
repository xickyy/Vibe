from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        body='ayee ayeee',
        mood='Sleepy',
        user_id=1,
        date= datetime.datetime(2020, 3, 21, 18, 7, 50, 873302))

    post2 = Post(
        body='This is my first post! :D',
        mood='Excited!',
        user_id=2,
        date= datetime.datetime(2021, 8, 13, 4, 7, 50, 873302))

    post3 = Post(
        body='How does this app even work??',
        mood='CoNfUsEd??',
        user_id=3,
        date= datetime.datetime(2022, 6, 5, 12, 7, 50, 873302))

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
