import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut, loadLessons, sendResetPasswordEmail, auth } from '../firebase'; // Updated path
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt, faStar, faSliders, faHouseChimney, faTools, faBook } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import "../App.css";
import { pylessons } from '../pylessons';

const SideBar = ({ setActiveLesson, setContent }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [lessons, setLessons] = useState(Object.values(pylessons)); // Load lessons from pylessons
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [index, setindex] = useState(0)
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      item.action();
    } else if (item.id === 'Settings') {
      setShowSettingsMenu(!showSettingsMenu);
    } else if (item.id === 'changePassword') {
      handleShowResetPasswordModal();
    } else if (typeof item.action === 'function') {
      setActiveItem(item.id);
      console.log('item id is '+ item.id)
      // setindex(index + 1)
      console.log('index is ' + index)
      
      item.action();
    }
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogout = async () => {
    try {
      await logOut();
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
    handleLogout();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const modal = document.querySelector('.modal');

      if (showSidebar && sidebar && !sidebar.contains(event.target) && !event.target.closest('.toggle-button')) {
        if (!showModal || (modal && !modal.contains(event.target))) {
          setShowSidebar(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSidebar, showModal]);
 
  const items = [
    { id: 'home', icon: faHouseChimney, label: 'Home', action: handleHomeClick },
    { id: 'Settings', icon: faTools, label: 'Settings', action: handleItemClick },
    { id: 'star', icon: faStar, label: 'Star' },
    { id: 'sliders', icon: faSliders, label: 'Sliders' },
    ...lessons.map((lesson, index) => ({
      id: `lesson${index + 1}`,
      icon: faBook,
      label: lesson.title,
      action: () => {
        setActiveLesson(`lesson${index + 1}`);
        setContent(setActiveLesson.content);
      console.log('index is ' + index)
        
      }
    })),
    { id: 'logout', icon: faSignOutAlt, label: 'Logout', action: handleShowModal },
  ];

  return (
    <>
      <button className="btn btn-primary toggle-button" onClick={toggleSidebar} style={{ zIndex: 1000, position: 'fixed', top: 10, left: 10 }}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`sidebar fixed-top d-flex flex-column justify-content-between h-100 bg-dark text-white ${showSidebar ? 'col-2' : 'd-none'}`} style={{ transition: 'width 0.3s' }}>
        <div className="d-flex justify-content-end p-2">
          <FontAwesomeIcon icon={faTimes} className="icon" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
        </div>
        <ul className="items list-unstyled p-3">
          {items.map(item => (
            <li 
              key={item.id} 
              className={`my-2 ${activeItem === item.id ? 'active' : ''}`} 
              onClick={() => handleItemClick(item)} 
            >
              {item.icon && <FontAwesomeIcon icon={item.icon} className="icon" />}
              <span>{item.label}</span>
              {item.id === 'Settings' && showSettingsMenu && (
                <ul className="settings-submenu list-unstyled bg-dark text-white position-absolute" style={{ left: '100%', top: '20%' }}>
                  <li className="my-2" onClick={() => handleItemClick({ id: 'changePassword' })}>Change Password</li>
                  <li className="my-2" onClick={() => handleItemClick({ id: 'changeUsername' })}>Change Username</li>
                </ul>
              )}
            </li>
          ))}
        </ul>
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
    </>
  );
}

export default SideBar;
