import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../styles/Youths.css'; // Import CSS for styling

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
          // Optionally, you can update the list of youths after adding a new one
        })
        .catch(error => console.error('Error creating youth:', error));
    },
  });

  return (
    <form className="youth-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Youth Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div className="error-msg">{formik.errors.name}</div> : null}
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.age}
        />
        {formik.errors.age ? <div className="error-msg">{formik.errors.age}</div> : null}
      </div>
      <button type="submit" className="submit-btn">Add Youth</button>
    </form>
  );
}

export default YouthForm;
