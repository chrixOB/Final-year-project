import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmailPassword } from './firebase';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (emailError || passwordError || confirmPasswordError || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      return;
    }

    setLoading(true);
    setGeneralError(''); // Clear any previous general error message

    try {
      await signUpWithEmailPassword(email, password);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setGeneralError('ERROR: email already in use');
      }
      else if (error.code === 'auth/network-request-failed') {
        setGeneralError('ERROR: You are offline. Please check your internet connection.');
      }
      else {
        setGeneralError(error.message);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 mx-auto">
          <h1 className='text-center'>Create Your Account</h1>
          {showSuccess && (
            <div className="alert alert-success" role="alert">
              Account created successfully! Redirecting to login page...
            </div>
          )}
          {generalError && (
            <div className="alert alert-danger" role="alert">
              {generalError}
            </div>
          )}
          <form className='needs-validation' onSubmit={handleSubmit} noValidate>
            <div className="form-group my-4">
              <label htmlFor="email" className='mb-3'>Email:</label>
              <input
                type="email"
                className={`form-control ${emailError ? 'is-invalid' : email ? 'is-valid' : ''}`}
                id="email"
                placeholder='Enter your email'
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            <div className="form-group my-4">
              <label htmlFor="password" className='mb-3'>Password:</label>
              <input
                type="password"
                className={`form-control ${passwordError ? 'is-invalid' : password ? 'is-valid' : ''}`}
                id="password"
                placeholder='Enter your password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && <div className="invalid-feedback">{passwordError}</div>}
            </div>
            <div className="form-group my-4">
              <label htmlFor="confirmPassword" className='mb-3'>Confirm Password:</label>
              <input
                type="password"
                className={`form-control ${confirmPasswordError ? 'is-invalid' : confirmPassword ? 'is-valid' : ''}`}
                id="confirmPassword"
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
            </div>
            <div className='d-flex justify-content-center'>
              {loading ? (
                <button type="submit" className="btn btn-primary mt-4" style={{ width: '35%' }} disabled>
                  <span className="spinner-grow spinner-grow-sm text-light" aria-hidden="true"></span>
                  <span className="" role='status'>Loading...</span>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary mt-4" style={{ width: '35%' }}>
                  <span>Sign Up</span>
                </button>
              )}
            </div>
          </form>
          <div className="mt-3 text-center">
            <Link to="/login">Already have an account? Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
