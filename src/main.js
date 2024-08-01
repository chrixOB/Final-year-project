import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import WorkingArea from './components/WorkingArea';
import SideBar from './components/SideBar';
import { auth } from './firebase'; // Adjusted import path

function Main() {
  const location = useLocation();
  const [activeLesson, setActiveLesson] = useState(null);
  const [content, setContent] = useState(null);
  const [user, setUser] = useState(null);
  const LoadingUser = "Loading User...";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLessonSelect = (lessonId, content) => {
    setActiveLesson(lessonId);
    setContent(content);
  };

  return (
    <div>
      {user ? (
        <>
          <TopBar user={user} />
          <div className="d-flex">
            <SideBar setActiveLesson={handleLessonSelect} setContent={setContent} />
            <WorkingArea activeLesson={activeLesson} content={content} />
          </div>
        </>
      ) : (
        <>
        <TopBar user={LoadingUser} />
        <div className="d-flex">
          <SideBar setActiveLesson={handleLessonSelect} setContent={setContent} />
          <WorkingArea activeLesson={activeLesson} content={content} />
        </div>
      </>
      )}
    </div>
  );
}

export default Main;
