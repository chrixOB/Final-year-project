import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, sendResetPasswordEmail } from './firebase';
import GoogleLoginButton from './GoogleLoginButton';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

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

  const checkOnlineStatus = () => {
    return navigator.onLine;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError || email.trim() === '' || password.trim() === '') {
      return;
    }

    if (!checkOnlineStatus()) {
      setGeneralError('You are offline. Please check your internet connection.');
      return;
    }

    setLoading(true);
    setGeneralError(''); // Clear any previous general error message

    setTimeout(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/main', { state: { email } }); // Pass email as state
        }, 6000);
      } catch (error) {
        setLoading(false);
        setPasswordError("Invalid credentials");
      }
    }, 4000); // delay loading for 4 seconds
  };

  const handleResetPassword = async () => {
    if (!emailRegex.test(resetEmail)) {
      setResetError('Please enter a valid email address');
      return;
    }

    try {
      await sendResetPasswordEmail(resetEmail);
      setResetSuccess('Password reset email sent! Check your inbox.');
      setResetError('');
    } catch (error) {
      setResetError('Failed to send reset email. Please try again.');
      setResetSuccess('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 mx-auto">
          <h1 className='text-center'>Log Into Your Account</h1>
          {showSuccess && (
            <div className="alert alert-success" role="alert">
              Login successful! Redirecting to main page...
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
            <div className='d-flex justify-content-center'>
              {loading ? (
                <button type="submit" className="btn btn-primary mt-4" style={{ width: '35%' }} disabled>
                  <span className="spinner-grow spinner-grow-sm text-light" aria-hidden="true"></span>
                  <span className="" role='status'>Loading...</span>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary mt-4" style={{ width: '35%' }}>
                  <span>Login</span>
                </button>
              )}
            </div>
            <div className="mt-3 text-center">
              <button type="button" className="btn btn-link" onClick={() => setShowResetPasswordModal(true)}>Forgot Password?</button>
          </div>
          </form>
          <div className='d-flex align-items-center justify-content-center my-3'>
            <hr className='flex-grow-1' />
            <span className='mx-2'>OR</span>
            <hr className='flex-grow-1' />
          </div>
          <div className='mt-3 d-flex justify-content-center'>
            <GoogleLoginButton />
          </div>
          <div className="mt-3 text-center">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>

      {/* Modal for Password Reset */}
      <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group my-4">
            <label htmlFor="resetEmail" className='mb-3'>Email:</label>
            <input
              type="email"
              className={`form-control ${resetError ? 'is-invalid' : resetEmail ? 'is-valid' : ''}`}
              id="resetEmail"
              placeholder='Enter your email'
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            {resetError && <div className="invalid-feedback">{resetError}</div>}
            {resetSuccess && <div className="valid-feedback">{resetSuccess}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleResetPassword}>
            Send Reset Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
