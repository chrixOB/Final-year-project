import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faStar, faSliders, faHouseChimney, faBook } from '@fortawesome/free-solid-svg-icons';
import "../App.css";
import { pylessons } from '../pylessons';

const SideBar = ({ActiveLesson }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const sidebarRef = useRef(null); // Reference to the sidebar element

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleItemClick = (item) => {
    if (typeof item.action === 'function') {
      setActiveItem(item.id);
      item.action();
    }
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means the effect runs only once

  const items = [
    { id: 'home', icon: faHouseChimney, label: 'Home', action: handleHomeClick },
    { id: 'star', icon: faStar, label: 'Star' },
    { id: 'sliders', icon: faSliders, label: 'Sliders' },
    ...Object.values(pylessons).map((lesson, index) => ({
      id: `lesson${index + 1}`,
      icon: faBook,
      label: lesson.title,
      action: () => {
        ActiveLesson(`lesson${index + 1}`, lesson.content, lesson.title);
        console.log(`Lesson ID: lesson${index + 1}`);
        console.log(`Index: ${index}`);
      }
    })),
  ];

  return (
    <>
      <button className="btn btn-primary toggle-button" onClick={toggleSidebar} style={{ zIndex: 1000, position: 'fixed', top: 10, left: 10 }}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div 
        ref={sidebarRef} 
        className={`sidebar fixed-top d-flex flex-column justify-content-between h-100 bg-dark text-white ${showSidebar ? 'col-2' : 'd-none'}`} 
        style={{ transition: 'width 0.3s' }}
      >
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
