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
        console.log(user);
      } else {
        setUser(null);
        console.log("user not found");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLessonSelect = (lessonId, lessonContent) => {
    setActiveLesson(lessonId);
    setContent(lessonContent);
  };

  return (
    <div>
      {user ? (
        <>
          {console.log(user)}
          <TopBar user={user} />
          <div className="d-flex">
            <SideBar setActiveLesson={handleLessonSelect} />
            <WorkingArea activeLesson={activeLesson} content={content} />
          </div>
        </>
      ) : (
        <>
          {console.log("User not found")}
          <TopBar user={LoadingUser} />
          <div className="d-flex">
            <SideBar setActiveLesson={handleLessonSelect} />
            <WorkingArea activeLesson={activeLesson} content={content} />
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
