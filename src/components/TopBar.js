import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';

const TopBar = ({ user, setActiveLesson, setContent, LoadingUser }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const displayName = user ? user.substring(0, user.indexOf('@')) : 'Loading User...';

  return (
    <div className="topbar d-flex justify-content-between align-items-center bg-secondary px-2 fixed-top" 
      style={{ height: '55px' }}>
      <div>
        <SideBar setActiveLesson={setActiveLesson} setContent={setContent} />
      </div>
      <div className="icon-wrapper d-flex align-items-center">
        <span className="username mx-2" style={{color:'white'}}>{displayName}</span>
        <FontAwesomeIcon className="mx-2" icon={faUser} />
        <button className={`toggle-theme btn btn-outline-light mx-2 ${isDarkMode ? 'dark' : ''}`} onClick={toggleDarkMode}>
          <FontAwesomeIcon className="mx-1" icon={faSun} />
          <FontAwesomeIcon className="mx-1" icon={faMoon} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
