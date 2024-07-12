// src/components/YouthForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api';
import '../styles/Youths.css';

const validationSchema = yup.object({
  name: yup.string().required('Youth name is required'),
  age: yup.number().required('Age is required').positive().integer(),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  image_url: yup.string().url('Invalid URL'),
  game_id: yup.number().required('Game ID is required').positive().integer(),
});

function YouthForm({ addYouth }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      image_url: '',
      game_id: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      api.post('/youths', values)
        .then(response => {
          addYouth(response.data);
          resetForm();
        })
        .catch(error => console.error('Error creating youth:', error));
    },
  });

  return (
    <form className="youth-form" onSubmit={formik.handleSubmit}>
      {/* form fields for name, age, email, password, image_url, game_id */}
      {/* Add form fields here */}
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
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div className="error-msg">{formik.errors.email}</div> : null}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div className="error-msg">{formik.errors.password}</div> : null}
      </div>
      <div className="form-group">
        <label htmlFor="image_url">Image URL</label>
        <input
          id="image_url"
          name="image_url"
          type="url"
          onChange={formik.handleChange}
          value={formik.values.image_url}
        />
        {formik.errors.image_url ? <div className="error-msg">{formik.errors.image_url}</div> : null}
      </div>
      <div className="form-group">
        <label htmlFor="game_id">Game ID</label>
        <input
          id="game_id"
          name="game_id"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.game_id}
        />
        {formik.errors.game_id ? <div className="error-msg">{formik.errors.game_id}</div> : null}
      </div>
      <button type="submit" className="submit-btn">Add Youth</button>
    </form>
  );
}

export default YouthForm;
