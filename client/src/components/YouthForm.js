// src/components/YouthForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const YouthSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  age: Yup.number().required('Required').positive().integer(),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function YouthForm() {
  return (
    <div>
      <h2>Add/Update Youth</h2>
      <Formik
        initialValues={{ name: '', age: '', email: '', password: '' }}
        validationSchema={YouthSchema}
        onSubmit={(values, { setSubmitting }) => {
          fetch('http://localhost:5000/youths', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }).then(response => {
            if (response.ok) {
              alert('Youth added successfully');
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
              <label>Age:</label>
              <Field type="number" name="age" />
              <ErrorMessage name="age" component="div" />
            </div>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
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

export default YouthForm;
