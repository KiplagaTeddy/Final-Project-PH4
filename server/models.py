from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

class Youth(db.Model, SerializerMixin):
    __tablename__ = 'youths'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String)
    game_id = db.Column(db.Integer, nullable=False)

    enrollments = db.relationship('Enrollment', backref='youth', lazy=True)
    games = association_proxy('enrollments', 'game')

    def __repr__(self):
        return f"<Youth {self.name}>"

class Game(db.Model, SerializerMixin):

    __tablename__ = 'games'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    patron_id = db.Column(db.Integer, db.ForeignKey('patrons.id'))
    image_url = db.Column(db.String)
    youth_id = db.Column(db.Integer, nullable=False)

    patron = db.relationship('Patron', backref='games')
    enrollments = db.relationship('Enrollment', backref='game', lazy=True)
    youths = association_proxy('enrollments', 'youth')

    def __repr__(self):
        return f"<Game {self.name}>"

class Enrollment(db.Model, SerializerMixin):

    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    youth_id = db.Column(db.Integer, db.ForeignKey('youths.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    enrollment_date = db.Column(db.DateTime, default=db.func.current_timestamp())

    youth = db.relationship('Youth', backref='enrollment_assoc')
    game = db.relationship('Game', backref='enrollment_assoc')

    def __repr__(self):
        return f"<Enrollment youth_id={self.youth_id} game_id={self.game_id}>"

class Patron(db.Model, SerializerMixin):

    __tablename__ = 'patrons'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String)

    def __repr__(self):
        return f"<Patron {self.name}>"
