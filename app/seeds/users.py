from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        first_name='Demo',
        last_name='User',
        profile_pic_url='https://i.pinimg.com/originals/c7/0c/36/c70c3652b86753708079b17e9033c488.jpg',
        bio='This is my Bio',
        zodiac='Cancer',
        height='5"8',
        relationship_status='single',
        birthday='07-22-1983',
        motto='this is my motto!',
        card_img_url='',
        profile_background_img_url='',
        email='demo@aa.io',
        password='password')

    marnie = User(
        username='marnie',
        first_name='Marnie',
        last_name='Jones',
        profile_pic_url='https://i.pinimg.com/originals/c7/0c/36/c70c3652b86753708079b17e9033c488.jpg',
        bio='This is my Bio',
        zodiac='Sagittarius',
        height='4"11',
        relationship_status='Open',
        birthday='12-05-1993',
        motto='this is my motto!',
        card_img_url='',
        profile_background_img_url='',
        email='marnie@aa.io',
        password='password')

    bobbie = User(
        username='bobbie',
        first_name='Bobbie',
        last_name='Lane',
        profile_pic_url='https://i.pinimg.com/originals/c7/0c/36/c70c3652b86753708079b17e9033c488.jpg',
        bio='This is my Bio',
        zodiac='Leo',
        height='6"1',
        relationship_status="it's complicated",
        birthday='08-12-2002',
        motto='this is my motto!',
        card_img_url='',
        profile_background_img_url='',
        email='bobbie@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
