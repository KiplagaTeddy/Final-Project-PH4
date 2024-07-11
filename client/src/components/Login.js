import React from 'react';
import '../styles/Login.css'; // Import CSS for styling

function Login() {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
