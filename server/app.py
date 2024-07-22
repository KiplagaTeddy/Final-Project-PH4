#!/usr/bin/env python3

from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate
from models import db, Youth, Game, Enrollment, Patron, PatronGame  
from flask_cors import CORS
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

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
        print(data)
        youth = Youth(
            name=data.get('name'),
            age=data.get('age'),
            email=data.get('email')
        )
        try:
            db.session.add(youth)
            db.session.commit()
            return youth.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    def put(self, youth_id):
        data = request.get_json()
        youth = Youth.query.get(youth_id)
        if youth:
            youth.name = data.get('name', youth.name)
            youth.age = data.get('age', youth.age)
            youth.email = data.get('email', youth.email)
            try:
                db.session.commit()
                return youth.to_dict(), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Youth not found'}, 404

    def delete(self, youth_id):
        youth = Youth.query.get(youth_id)
        if youth:
            try:
                Enrollment.query.filter_by(youth_id=youth_id).delete()
                db.session.delete(youth)
                db.session.commit()
                return {'message': 'Youth deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
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
            patron_id=data.get('patron_id')
        )
        try:
            db.session.add(game)
            db.session.commit()
            return game.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    def put(self, game_id):
        data = request.get_json()
        game = Game.query.get(game_id)
        if game:
            game.name = data.get('name', game.name)
            game.description = data.get('description', game.description)
            game.patron_id = data.get('patron_id', game.patron_id)
            try:
                db.session.commit()
                return game.to_dict(), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Game not found'}, 404

    def delete(self, game_id):
        game = Game.query.get(game_id)
        if game:
            try:
                db.session.delete(game)
                db.session.commit()
                return {'message': 'Game deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
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
        try:
            db.session.add(enrollment)
            db.session.commit()
            return enrollment.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    def put(self, enrollment_id):
        data = request.get_json()
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            enrollment.youth_id = data.get('youth_id', enrollment.youth_id)
            enrollment.game_id = data.get('game_id', enrollment.game_id)
            try:
                db.session.commit()
                return enrollment.to_dict(), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Enrollment not found'}, 404

    def delete(self, enrollment_id):
        enrollment = Enrollment.query.get(enrollment_id)
        if enrollment:
            try:
                db.session.delete(enrollment)
                db.session.commit()
                return {'message': 'Enrollment deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
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
            phone_number=data.get('phone_number')
        )
        try:
            db.session.add(patron)
            db.session.commit()
            return patron.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    def put(self, patron_id):
        data = request.get_json()
        patron = Patron.query.get(patron_id)
        if patron:
            patron.name = data.get('name', patron.name)
            patron.email = data.get('email', patron.email)
            patron.phone_number = data.get('phone_number', patron.phone_number)
            try:
                db.session.commit()
                return patron.to_dict(), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Patron not found'}, 404


class EnrollmentDetails(Resource):
    def get(self):
        # Join Youth, Game, and Enrollment tables
        results = db.session.query(
            Enrollment.id.label('enrollment_id'),
            Youth.name.label('youth_name'),
            Youth.age.label('youth_age'),
            Youth.email.label('youth_email'),
            Game.id.label('game_id'),
            Game.name.label('game_name'),
            Enrollment.enrollment_date.label('enrollment_date')
        ).join(Youth, Enrollment.youth_id == Youth.id)\
         .join(Game, Enrollment.game_id == Game.id).all()

        enrollment_details = []
        for result in results:
            enrollment_details.append({
                'enrollment_id': result.enrollment_id,
                'youth_name': result.youth_name,
                'youth_age': result.youth_age,
                'youth_email': result.youth_email,
                'game_id': result.game_id,
                'game_name': result.game_name,
                'enrollment_date': result.enrollment_date.strftime('%Y-%m-%d') if result.enrollment_date else None
            })

        return jsonify(enrollment_details)

class PatronGameDetails(Resource):
    def get(self):
        # Join Patron and Game tables through PatronGame
        results = db.session.query(
            Patron.id.label('patron_id'),
            Patron.name.label('patron_name'),
            Game.id.label('game_id'),
            Game.name.label('game_name')
        ).join(PatronGame, Patron.id == PatronGame.patron_id)\
         .join(Game, PatronGame.game_id == Game.id).all()

        patron_game_details = []
        for result in results:
            patron_game_details.append({
                'patron_id': result.patron_id,
                'patron_name': result.patron_name,
                'game_id': result.game_id,
                'game_name': result.game_name
            })

        return jsonify(patron_game_details)

    def post(self):
        data = request.get_json()
        patron_id = data.get('patron_id')
        game_id = data.get('game_id')
        game_id_2 = data.get('game_id_2')

        PatronGame.query.filter_by(patron_id=patron_id).delete()

        # Add new patron games
        patron_games = []
        if game_id:
            patron_games.append(PatronGame(patron_id=patron_id, game_id=game_id))
        if game_id_2:
            patron_games.append(PatronGame(patron_id=patron_id, game_id=game_id_2))

        try:
            db.session.bulk_save_objects(patron_games)
            db.session.commit()
            return {'message': 'Patron games updated successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

    def put(self):
        data = request.get_json()
        patron_id = data.get('patron_id')
        game_id = data.get('game_id')
        game_id_2 = data.get('game_id_2')

        PatronGame.query.filter_by(patron_id=patron_id).delete()

        # Update patron games
        patron_games = []
        if game_id:
            patron_games.append(PatronGame(patron_id=patron_id, game_id=game_id))
        if game_id_2:
            patron_games.append(PatronGame(patron_id=patron_id, game_id=game_id_2))

        try:
            db.session.bulk_save_objects(patron_games)
            db.session.commit()
            return {'message': 'Patron games updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400

@app.route('/patrons/<int:id>', methods=['DELETE'])
def delete_patron(id):
    try:
        patron = Patron.query.get(id)
        if not patron:
            return jsonify({'error': 'Patron not found'}), 404
        
        # Delete associated records in patron_games
        PatronGame.query.filter_by(patron_id=id).delete()
        
        # Delete the patron
        db.session.delete(patron)
        db.session.commit()
        
        return jsonify({'message': 'Patron deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

api.add_resource(YouthResource, '/youths', '/youths/<int:youth_id>')
api.add_resource(GameResource, '/games', '/games/<int:game_id>')
api.add_resource(EnrollmentResource, '/enrollments', '/enrollments/<int:enrollment_id>')
api.add_resource(PatronResource, '/patrons', '/patrons/<int:patron_id>')
api.add_resource(EnrollmentDetails, '/enrollment_details')
api.add_resource(PatronGameDetails, '/patron_game_details')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
