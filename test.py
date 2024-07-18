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