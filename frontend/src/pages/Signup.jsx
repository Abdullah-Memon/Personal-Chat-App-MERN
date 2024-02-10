// Signup.js (Signup Page Component)

import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input type="text" id="fullname" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="gender-radio">
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" placeholder="Confirm your password" />
        </div>
        <div className="form-actions">
          <Link type="button" className="go-back-btn" to="/">Go Back</Link>
          <button type="button" className="signup-btn">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
