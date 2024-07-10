// src/components/ProgramForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProgramSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  schedule: Yup.string().required('Required'),
  patron_id: Yup.number().required('Required').positive().integer(),
});

function ProgramForm() {
  return (
    <div>
      <h2>Add/Update Program</h2>
      <Formik
        initialValues={{ name: '', description: '', schedule: '', patron_id: '' }}
        validationSchema={ProgramSchema}
        onSubmit={(values, { setSubmitting }) => {
          fetch('http://localhost:5000/programs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then(response => {
            if (response.ok) {
              alert('Program added successfully');
            }
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Description:</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label>Schedule:</label>
              <Field type="text" name="schedule" />
              <ErrorMessage name="schedule" component="div" />
            </div>
            <div>
              <label>Patron ID:</label>
              <Field type="number" name="patron_id" />
              <ErrorMessage name="patron_id" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProgramForm;
