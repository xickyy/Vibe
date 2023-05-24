from app.models import db, Boolean, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


# Adds a demo user, you can add other users here if you want
def seed_booleans():
    table1 = Boolean(
        first_name_b=True,
        last_name_b=True,
        bio_b=True,
        birthday_b=True,
        zodiac_b=True,
        height_b=True,
        motto_b=True,
        card_b=True,
        relationship_b=True,
        background_b=True,
        user_id=1
)

    table2 = Boolean(
        first_name_b=True,
        last_name_b=True,
        bio_b=True,
        birthday_b=True,
        zodiac_b=True,
        height_b=True,
        motto_b=True,
        card_b=True,
        relationship_b=True,
        background_b=True,
        user_id=2
)

    table3 = Boolean(
        first_name_b=True,
        last_name_b=True,
        bio_b=True,
        birthday_b=True,
        zodiac_b=True,
        height_b=True,
        motto_b=True,
        card_b=True,
        relationship_b=True,
        background_b=True,
        user_id=3
)

    table4 = Boolean(
        first_name_b=True,
        last_name_b=True,
        bio_b=True,
        birthday_b=True,
        zodiac_b=True,
        height_b=True,
        motto_b=True,
        card_b=True,
        relationship_b=True,
        background_b=True,
        user_id=4
)

    table5 = Boolean(
        first_name_b=True,
        last_name_b=True,
        bio_b=True,
        birthday_b=True,
        zodiac_b=True,
        height_b=True,
        motto_b=True,
        card_b=True,
        relationship_b=True,
        background_b=True,
        user_id=5
)

    table6 = Boolean(
        first_name_b=True,
        last_name_b=True,
        bio_b=True,
        birthday_b=True,
        zodiac_b=True,
        height_b=True,
        motto_b=True,
        card_b=True,
        relationship_b=True,
        background_b=True,
        user_id=6
)

    db.session.add(table1)
    db.session.add(table2)
    db.session.add(table3)
    db.session.add(table4)
    db.session.add(table5)
    db.session.add(table6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_booleans():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.booleans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM booleans"))

    db.session.commit()
