from datetime import datetime, timedelta
from random import randint
from config import app, db
from models import Youth, Game, Enrollment, Patron, PatronGame
import sqlalchemy as sa  # Import SQLAlchemy

# Create an application context to make Flask-SQLAlchemy work properly
app.app_context().push()

# Clear existing data
db.drop_all()
db.create_all()

# Sample data for youths with actual names
youth_names = [
    "James Smith", "John Johnson", "Robert Williams", "Michael Brown", "William Jones",
    "David Garcia", "Richard Miller", "Joseph Davis", "Thomas Martinez", "Mary Wilson"
]

# Generate 10 youths
youths_data = [
    {
        'name': youth_names[i],
        'age': randint(15, 20),
        'email': f"youth{i + 1}@vijanagmail.com",
        'password': str(i + 1),  # Sequential passwords 1 to 10
    }
    for i in range(10)
]

for youth_info in youths_data:
    youth = Youth(**youth_info)
    db.session.add(youth)

# Sample data for games with actual names and descriptions
games_data = [
    {
        'name': "Football",
        'description': "A competitive game involving two teams aiming to score goals by kicking a ball into the opponent's goal.",
        'image_url': "https://example.com/football.jpg",
    },
    {
        'name': "Rugby",
        'description': "A physically demanding sport where two teams of 15 players aim to carry an oval-shaped ball over the opponent's try line.",
        'image_url': "https://example.com/rugby.jpg",
    },
    {
        'name': "Basketball",
        'description': "A fast-paced game played by two teams of five players each, aiming to shoot a ball through the opponent's hoop.",
        'image_url': "https://example.com/basketball.jpg",
    },
    {
        'name': "Baseball",
        'description': "A bat-and-ball game played between two teams of nine players each, taking turns batting and fielding.",
        'image_url': "https://example.com/baseball.jpg",
    },
    {
        'name': "Tennis",
        'description': "A racket sport played individually or in pairs, where players use a stringed racket to hit a ball over a net into the opponent's court.",
        'image_url': "https://example.com/tennis.jpg",
    },
    {
        'name': "Golf",
        'description': "A precision club-and-ball sport, where players use various clubs to hit balls into a series of holes on a course in as few strokes as possible.",
        'image_url': "https://example.com/golf.jpg",
    },
    {
        'name': "Swimming",
        'description': "A water sport involving various strokes, where competitors race against each other using different techniques such as freestyle, breaststroke, backstroke, and butterfly.",
        'image_url': "https://example.com/swimming.jpg",
    },
    {
        'name': "Cricket",
        'description': "A bat-and-ball game played between two teams of eleven players on a field, where the batting team tries to score runs by hitting the ball while the fielding team tries to dismiss the batsmen and restrict the runs scored.",
        'image_url': "https://example.com/cricket.jpg",
    },
    {
        'name': "Track and Field",
        'description': "A sport that includes various athletic contests, such as running, jumping, throwing, and walking, performed on a track or field.",
        'image_url': "https://example.com/track-and-field.jpg",
    },
    {
        'name': "Volleyball",
        'description': "A team sport played by two teams of six players each, where the aim is to score points by grounding a ball on the opponent's court.",
        'image_url': "https://example.com/volleyball.jpg",
    }
]

for game_info in games_data:
    game = Game(**game_info)
    db.session.add(game)

# Sample data for patrons with actual names
patron_names = [
    "Alice Brown", "Bob Davis", "Carol Wilson", "David Garcia", "Emily Martinez"
]

# Generate patrons
patrons_data = [
    {
        'name': patron_names[i],
        'email': f"patron{i + 1}@vijanagmail.com",
        'phone_number': f"+2547{randint(10000000, 99999999)}",
    }
    for i in range(5)
]

for patron_info in patrons_data:
    patron = Patron(**patron_info)
    db.session.add(patron)

# Commit changes to the database
db.session.commit()

# Generate enrollments for youths in games with enrollment date
for youth_info in youths_data:
    youth = Youth.query.filter_by(name=youth_info['name']).first()
    game = Game.query.get(randint(1, len(games_data)))  # Random game assignment
    if youth and game:
        enrollment = Enrollment(
            youth_id=youth.id,
            game_id=game.id,
            enrollment_date=datetime.now() - timedelta(days=randint(1, 30))
        )
        db.session.add(enrollment)
    else:
        print(f"Skipping enrollment for youth {youth_info['name']} or game assignment because not found.")

# Commit enrollment changes to the database
db.session.commit()

# Generate patron_games relationships
for patron in Patron.query.all():
    # Randomly assign each patron to 1 to 3 games
    games = Game.query.order_by(sa.func.random()).limit(randint(1, 3)).all()
    for game in games:
        patron_game = PatronGame(
            patron_id=patron.id,
            game_id=game.id
        )
        db.session.add(patron_game)

# Commit patron_games changes to the database
db.session.commit()

print("Database seeded successfully.")
