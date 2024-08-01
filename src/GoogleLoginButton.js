// GoogleLoginButton.js
import React from 'react';
import { signInWithPopup, auth, provider } from './firebase'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import googleLogo from "./googleLogo.jpg";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Login Success:', result);
      localStorage.setItem('token', result.user.accessToken);
      navigate('/main');
    } catch (error) {
      console.log('Login Failed:', error);
    }
  };

  return (
    <button onClick={handleLogin} className="btn btn-outline-primary d-flex align-items-center justify-content-center">
      <img src={googleLogo} alt="Google logo" style={{ width: '20px', marginRight: '10px', fontSize: '15px' }} />
      Log in with Google
    </button>
  );
};

export default GoogleLoginButton;
