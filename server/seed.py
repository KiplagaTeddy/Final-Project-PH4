#!/usr/bin/env python3

# Standard library imports
from random import randint

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Youth, Game, Enrollment, Patron

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data (optional)
        db.drop_all()
        db.create_all()

        # Generate fake data
        patrons = []
        for _ in range(5):
            patron = Patron(
                name=fake.name(),
                email=fake.email(),
                phone_number=fake.phone_number(),
                image_url=fake.image_url()
            )
            patrons.append(patron)
            db.session.add(patron)
        
        games = []
        for _ in range(10):
            game = Game(
                name=fake.word(),
                description=fake.text(),
                patron_id=randint(1, len(patrons)),
                image_url=fake.image_url(),
                youth_id=randint(1, 100)  
            )
            games.append(game)
            db.session.add(game)

        youths = []
        for _ in range(50):
            youth = Youth(
                name=fake.name(),
                age=randint(10, 18),
                email=fake.email(),
                password=fake.password(),
                image_url=fake.image_url(),
                game_id=randint(1, len(games))
            )
            youths.append(youth)
            db.session.add(youth)

        enrollments = []
        for _ in range(100):
            enrollment = Enrollment(
                youth_id=randint(1, len(youths)),
                game_id=randint(1, len(games))
            )
            enrollments.append(enrollment)
            db.session.add(enrollment)

        # Commit all changes
        db.session.commit()

        print("Seed completed successfully!")
