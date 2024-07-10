import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Youth name is required'),
  age: yup.number().required('Age is required').positive().integer(),
});

function YouthForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Post the youth data to the backend API
      fetch('/api/youths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Youth created:', data);
        })
        .catch(error => console.error('Error creating youth:', error));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Youth Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.age}
        />
        {formik.errors.age ? <div>{formik.errors.age}</div> : null}
      </div>
      <button type="submit">Add Youth</button>
    </form>
  );
}

export default YouthForm;
