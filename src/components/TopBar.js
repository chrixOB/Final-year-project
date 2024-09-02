import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown, faSignOutAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import { Dropdown, DropdownButton, Modal, Button, Spinner } from 'react-bootstrap';
import { logOut, sendResetPasswordEmail, auth, updateUsername, getUsername } from '../firebase'; // inbuilt functions from firebase 

const TopBar = ({ user, ActiveLesson}) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userEmail = auth.currentUser?.email; // Get the current user's email
        const fetchedUsername = await getUsername(userEmail);
        const initialDisplayName = fetchedUsername || user.substring(0, user.indexOf('@'));
        setDisplayName(initialDisplayName);
        
      }
    };

    fetchUsername();
  }, [user]);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const handleLogout = async () => {
    try {
      await logOut();
      setDisplayName(''); // Clear display name on logout
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmLogout = () => {
    handleCloseModal();
    setShowSpinner(true);
    setTimeout(async () => {
      await handleLogout();
      setShowSpinner(false);
    }, 5000);
  };

  const handleShowResetPasswordModal = () => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
      setShowResetPasswordModal(true);
    } else {
      setResetPasswordError('No user is logged in.');
      setShowResetPasswordModal(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendResetPasswordEmail(userEmail);
      setResetPasswordSuccess('Password reset email sent successfully!');
      setResetPasswordError('');
    } catch (error) {
      setResetPasswordError('Error sending password reset email. Please try again.');
      setResetPasswordSuccess('');
    }
  };

  const handleShowUsernameModal = () => {
    setShowUsernameModal(true);
  };

  const handleCloseUsernameModal = () => {
    setShowUsernameModal(false);
  };

  const handleConfirmUsernameChange = async () => {
    const userEmail = auth.currentUser.email; // Use the current user's email as the ID
    await updateUsername(userEmail, newUsername); // Update username in Firestore
    setDisplayName(newUsername);
    setShowSuccessAlert(true);
    setShowUsernameModal(false);

    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  return (
    <div className="topbar d-flex justify-content-between align-items-center bg-secondary px-2 fixed-top" style={{ height: '55px' }}>
      <div>
        <SideBar ActiveLesson={ActiveLesson} />
      </div>
      <div className="icon-wrapper d-flex align-items-center">
        <span className="username mx-2" style={{ color: 'white' }}>{displayName}</span>
        <FontAwesomeIcon className="mx-2" icon={faUser} />
        {/* <button className={`toggle-theme btn btn-outline-light mx-2 ${isDarkMode ? 'dark' : ''}`} onClick={toggleDarkMode}> */}
          {/* <FontAwesomeIcon className="mx-1" icon={faSun} /> */}
          {/* <FontAwesomeIcon className="mx-1" icon={faMoon} /> */}
        {/* </button> */}
        <DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon icon={faCaretDown} />} className="mx-2" align="end">
          <Dropdown.Item onClick={handleShowResetPasswordModal}>Change Password</Dropdown.Item>
          <Dropdown.Item onClick={handleShowUsernameModal}>Change Username</Dropdown.Item>
          <Dropdown.Item onClick={handleShowModal}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></Dropdown.Item>
        </DropdownButton>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body><b style={{ fontSize: '1.3rem' }}>Are you sure you want to log out now?</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Click the button below to send a password reset email to <b>{userEmail}</b>.</p>
          <Button variant="primary" onClick={handleResetPassword}>Send Reset Email</Button>
          {resetPasswordError && <p className="text-danger mt-2">{resetPasswordError}</p>}
          {resetPasswordSuccess && <p className="text-success mt-2">{resetPasswordSuccess}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUsernameModal} onHide={handleCloseUsernameModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUsernameModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUsernameChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {showSpinner && (
        <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100" style={{ top: 0, left: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1000 }}>
          <Spinner animation="border" className="me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span>Logging out, please wait...</span>
        </div>
      )}

      {showSuccessAlert && (
        <div className="d-flex justify-content-center align-items-center position-fixed w-100 h-100" style={{ top: 0, left: 0, zIndex: 1000 }}>
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Username updated successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
