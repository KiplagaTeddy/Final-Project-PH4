#!/usr/bin/env python3

import bcrypt
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Youth, Game, Enrollment, Patron

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)

# Routes
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class YouthResource(Resource):
    def get(self, youth_id=None):
        if youth_id:
            youth = Youth.query.get(youth_id)
            if youth:
                return youth.to_dict(), 200
            return {'error': 'Youth not found'}, 404
        youths = Youth.query.all()
        return [youth.to_dict() for youth in youths], 200

    def post(self):
        data = request.get_json()
        youth = Youth(
            name=data.get('name'),
            age=data.get('age'),
            email=data.get('email'),
            image_url=data.get('image_url'),
            game_id=data.get('game_id')
        )
        db.session.add(youth)
        db.session.commit()
        return youth.to_dict(), 201

    def put(self, youth_id):
        data = request.get_json()
        youth = Youth.query.get(youth_id)
        if youth:
            youth.name = data.get('name', youth.name)
            youth.age = data.get('age', youth.age)
            youth.email = data.get('email', youth.email)
            youth.image_url = data.get('image_url', youth.image_url)
            youth.game_id = data.get('game_id', youth.game_id)
            db.session.commit()
            return youth.to_dict(), 200
        return {'error': 'Youth not found'}, 404

    def delete(self, youth_id):
        youth = Youth.query.get(youth_id)
        if youth:
            db.session.delete(youth)
            db.session.commit()
            return {'message': 'Youth deleted'}, 200
        return {'error': 'Youth not found'}, 404

class GameResource(Resource):
    def get(self, game_id=None):
        if game_id:
            game = Game.query.get(game_id)
            if game:
                return game.to_dict(), 200
            return {'error': 'Game not found'}, 404
        games = Game.query.all()
        return [game.to_dict() for game in games], 200

    def post(self):
        data = request.get_json()
        game = Game(
            name=data.get('name'),
            description=data.get('description'),
            patron_id=data.get('patron_id'),
            image_url=data.get('image_url'),
            youth_id=data.get('youth_id')
        )
        db.session.add(game)
        db.session.commit()
        return game.to_dict(), 201

    def put(self, game_id):
        data = request.get_json()
        game = Game.query.get(game_id)
        if game:
            game.name = data.get('name', game.name)
            game.description = data.get('description', game.description)
            game.patron_id = data.get('patron_id', game.patron_id)
            game.image_url = data.get('image_url', game.image_url)
            game.youth_id = data.get('youth_id', game.youth_id)
            db.session.commit()
            return game.to_dict(), 200
        return {'error': 'Game not found'}, 404

    def delete(self, game_id):
        game = Game.query.get(game_id)
        if game:
            db.session.delete(game)
            db.session.commit()
            return {'message': 'Game deleted'}, 200
        return {'error': 'Game not found'}, 404

class EnrollmentResource(Resource):
    def get(self, enrollment_id=None):
        if enrollment_id:
            enrollment = Enrollment.query.get(enrollment_id)
            if enrollment:
                return enrollment.to_dict(), 200
            return {'error': 'Enrollment not found'}, 404
        enrollments = Enrollment.query.all()
        return [enrollment.to_dict() for enrollment in enrollments], 200

    def post(self):
        data = request.get_json()
        enrollment = Enrollment(
            youth_id=data.get('youth_id'),
            game_id=data.get('game_id')
        )
        db.session.add(enrollment)
        db.session.commit()
        return enrollment.to_dict(), 201

    def put(self, enrollment_id):
        data = request.get_json()
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            enrollment.youth_id = data.get('youth_id', enrollment.youth_id)
            enrollment.game_id = data.get('game_id', enrollment.game_id)
            db.session.commit()
            return enrollment.to_dict(), 200
        return {'error': 'Enrollment not found'}, 404

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            db.session.delete(enrollment)
            db.session.commit()
            return {'message': 'Enrollment deleted'}, 200
        return {'error': 'Enrollment not found'}, 404

class PatronResource(Resource):
    def get(self, patron_id=None):
        if patron_id:
            patron = Patron.query.get(patron_id)
            if patron:
                return patron.to_dict(), 200
            return {'error': 'Patron not found'}, 404
        patrons = Patron.query.all()
        return [patron.to_dict() for patron in patrons], 200

    def post(self):
        data = request.get_json()
        patron = Patron(
            name=data.get('name'),
            email=data.get('email'),
            phone_number=data.get('phone_number'),
            image_url=data.get('image_url')
        )
        db.session.add(patron)
        db.session.commit()
        return patron.to_dict(), 201

    def put(self, patron_id):
        data = request.get_json()
        patron = Patron.query.get(patron_id)
        if patron:
            patron.name = data.get('name', patron.name)
            patron.email = data.get('email', patron.email)
            patron.phone_number = data.get('phone_number', patron.phone_number)
            patron.image_url = data.get('image_url', patron.image_url)
            db.session.commit()
            return patron.to_dict(), 200
        return {'error': 'Patron not found'}, 404

    def delete(self, patron_id):
        patron = Patron.query.get(patron_id)
        if patron:
            db.session.delete(patron)
            db.session.commit()
            return {'message': 'Patron deleted'}, 200
        return {'error': 'Patron not found'}, 404

api.add_resource(YouthResource, '/youths', '/youths/<int:youth_id>')
api.add_resource(GameResource, '/games', '/games/<int:game_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:enrollment_id>')
api.add_resource(PatronResource, '/patrons', '/patrons/<int:patron_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
