// Login.js (Login Page Component)
import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="form-actions">
          <Link type="button" className="signup-btn" to="/signup">Signup</Link>
          <Link to = "/dashboard" type="button" className="login-btn">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
