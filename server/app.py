#!/usr/bin/env python3

import bcrypt
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Youth, Game, Enrollment, Patron

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app, resources={r"/*": {"origins": "*"}})
db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Youths Resource
class Youths(Resource):
    def get(self):
        youths = [youth.to_dict() for youth in Youth.query.all()]
        return make_response(jsonify(youths), 200)

    def post(self):
        data = request.get_json()
        new_youth = Youth(
            name=data.get('name'),
            age=data.get('age'),
            email=data.get('email'),
            image_url=data.get('image_url'),
            game_id=data.get('game_id')
        )
        db.session.add(new_youth)
        db.session.commit()
        return make_response(new_youth.to_dict(), 201)

api.add_resource(Youths, '/youths')

# YouthByID Resource
class YouthByID(Resource):
    def get(self, youth_id):
        youth = Youth.query.get(youth_id)
        if youth:
            return make_response(jsonify(youth.to_dict()), 200)
        return make_response(jsonify({'error': 'Youth not found'}), 404)

    def patch(self, youth_id):
        data = request.get_json()
        youth = Youth.query.get(youth_id)
        if youth:
            for attr in data:
                setattr(youth, attr, data[attr])
            db.session.commit()
            return make_response(jsonify(youth.to_dict()), 200)
        return make_response(jsonify({'error': 'Youth not found'}), 404)

    def delete(self, youth_id):
        youth = Youth.query.get(youth_id)
        if youth:
            db.session.delete(youth)
            db.session.commit()
            return make_response('', 204)
        return make_response(jsonify({'error': 'Youth not found'}), 404)

api.add_resource(YouthByID, '/youths/<int:youth_id>')

# Games Resource
class Games(Resource):
    def get(self):
        games = [game.to_dict() for game in Game.query.all()]
        return make_response(jsonify(games), 200)

    def post(self):
        data = request.get_json()
        new_game = Game(
            name=data.get('name'),
            description=data.get('description'),
            patron_id=data.get('patron_id'),
            image_url=data.get('image_url'),
            youth_id=data.get('youth_id')
        )
        db.session.add(new_game)
        db.session.commit()
        return make_response(new_game.to_dict(), 201)

api.add_resource(Games, '/games')

# GameByID Resource
class GameByID(Resource):
    def get(self, game_id):
        game = Game.query.get(game_id)
        if game:
            return make_response(jsonify(game.to_dict()), 200)
        return make_response(jsonify({'error': 'Game not found'}), 404)

    def patch(self, game_id):
        data = request.get_json()
        game = Game.query.get(game_id)
        if game:
            for attr in data:
                setattr(game, attr, data[attr])
            db.session.commit()
            return make_response(jsonify(game.to_dict()), 200)
        return make_response(jsonify({'error': 'Game not found'}), 404)

    def delete(self, game_id):
        game = Game.query.get(game_id)
        if game:
            db.session.delete(game)
            db.session.commit()
            return make_response('', 204)
        return make_response(jsonify({'error': 'Game not found'}), 404)

api.add_resource(GameByID, '/games/<int:game_id>')

# Enrollments Resource
class Enrollments(Resource):
    def get(self):
        enrollments = [enrollment.to_dict() for enrollment in Enrollment.query.all()]
        return make_response(jsonify(enrollments), 200)

    def post(self):
        data = request.get_json()
        new_enrollment = Enrollment(
            youth_id=data.get('youth_id'),
            game_id=data.get('game_id')
        )
        db.session.add(new_enrollment)
        db.session.commit()
        return make_response(new_enrollment.to_dict(), 201)

api.add_resource(Enrollments, '/enrollments')

# EnrollmentByID Resource
class EnrollmentByID(Resource):
    def get(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            return make_response(jsonify(enrollment.to_dict()), 200)
        return make_response(jsonify({'error': 'Enrollment not found'}), 404)

    def patch(self, enrollment_id):
        data = request.get_json()
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            for attr in data:
                setattr(enrollment, attr, data[attr])
            db.session.commit()
            return make_response(jsonify(enrollment.to_dict()), 200)
        return make_response(jsonify({'error': 'Enrollment not found'}), 404)

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            db.session.delete(enrollment)
            db.session.commit()
            return make_response('', 204)
        return make_response(jsonify({'error': 'Enrollment not found'}), 404)

api.add_resource(EnrollmentByID, '/enrollments/<int:enrollment_id>')

# Patrons Resource
class Patrons(Resource):
    def get(self):
        patrons = [patron.to_dict() for patron in Patron.query.all()]
        return make_response(jsonify(patrons), 200)

    def post(self):
        data = request.get_json()
        new_patron = Patron(
            name=data.get('name'),
            email=data.get('email'),
            phone_number=data.get('phone_number'),
            image_url=data.get('image_url')
        )
        db.session.add(new_patron)
        db.session.commit()
        return make_response(new_patron.to_dict(), 201)

api.add_resource(Patrons, '/patrons')

# PatronByID Resource
class PatronByID(Resource):
    def get(self, patron_id):
        patron = Patron.query.get(patron_id)
        if patron:
            return make_response(jsonify(patron.to_dict()), 200)
        return make_response(jsonify({'error': 'Patron not found'}), 404)

    def patch(self, patron_id):
        data = request.get_json()
        patron = Patron.query.get(patron_id)
        if patron:
            for attr in data:
                setattr(patron, attr, data[attr])
            db.session.commit()
            return make_response(jsonify(patron.to_dict()), 200)
        return make_response(jsonify({'error': 'Patron not found'}), 404)

    def delete(self, patron_id):
        patron = Patron.query.get(patron_id)
        if patron:
            db.session.delete(patron)
            db.session.commit()
            return make_response('', 204)
        return make_response(jsonify({'error': 'Patron not found'}), 404)

api.add_resource(PatronByID, '/patrons/<int:patron_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
