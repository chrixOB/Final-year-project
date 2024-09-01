import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSliders, faHouseChimney, faBook, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { pylessons } from '../pylessons'; // import lessons content from pylessons object.
import QuizHolder from './QuizHolder'; // import the quiz holder component

const SideBar = ({ ActiveLesson }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const sidebarRef = useRef(null);

  // styling for custom card created(which displays on homePage)
  const cardStyle = {
    height: '70%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '5%',
    backgroundColor: '#5390eb',
    color: 'white',
    boxShadow: '5px 8px 17px black',
    borderRadius: '8px'
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleItemClick = (item) => {
    if (typeof item.action === 'function') {
      setActiveItem(item.id);
      item.action();
    }
  };

  let lessonsCompleted = 0;
  let quizzesCompleted = 0;

  const handleHomeClick = () => {
    const homeContent = (
      <div className="home-outer-div d-flex align-items-center justify-content-center" style={{ border: '2px solid black', paddingTop: '0' }}>
        <div className="home-content" style={{ width: "100%", border: '2px solid blue' }}>
          <div className="course-progress" style={cardStyle}>
            <h3>Course Progress(%)</h3>
            <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar bg-info" style={{ width: "20%", color: 'white', fontSize: '1.2rem', height: '100%', padding: '3.5%' }}>20%</div>
            </div>
          </div>
          <div className="w-100 border border-4 border-primary mt-3" style={cardStyle}>
            <h3>LESSONS COMPLETED ({lessonsCompleted})</h3>
          </div>
          <div className="w-100 border border-4 border-primary mt-3" style={cardStyle}>
            <h3>QUIZZES COMPLETED ({quizzesCompleted})</h3>
          </div>
          <div className="w-100 border border-4 border-primary mt-3" style={cardStyle}>
            <h3>PROJECTS COMPLETED (5)</h3>
          </div>
        </div>
      </div>
    );

    ActiveLesson('home', homeContent, 'Home');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const items = [
    { id: 'home', icon: faHouseChimney, label: 'Home', action: handleHomeClick },
    { id: 'sliders', icon: faSliders, label: 'Options' },
    ...Object.values(pylessons).flatMap((lesson, index) => {
      const lessonItem = {
        id: `lesson${index + 1}`,
        icon: faBook,
        label: lesson.title,
        action: () => {
          ActiveLesson(`lesson${index + 1}`, lesson.content, lesson.title);
        }
      };
  
      const quizIndex = Math.floor(index / 5) + 1;
      const isQuizPosition = (index + 1) % 5 === 0;
      const quizItem = {
        id: `quiz${quizIndex}`,
        icon: faQuestionCircle,
        label: `Quiz ${quizIndex}`,
        action: () => {
          ActiveLesson(`quiz${quizIndex}`, <QuizHolder quizId={`quiz${quizIndex}`} />, `Quiz ${quizIndex}`);
        }
      };
  
      return isQuizPosition ? [lessonItem, quizItem] : [lessonItem];
    }),
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
};

export default SideBar;
