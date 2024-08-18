import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import WorkingArea from './components/WorkingArea';
// import SideBar from './components/SideBar';
import { auth } from './firebase'; // Adjusted import path

function Main() {
  // eslint-disable-next-line
  const location = useLocation();
  const [activeLesson, setActiveLesson] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null)
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

  const handleLessonSelect = (lessonId, lessonContent, lessonTitle) => {
    setActiveLesson(lessonId);
    setContent(lessonContent);
    setTitle(lessonTitle)
  };

  return (
    <div>
      {user ? (
        <>
          {console.log(user)}
          <TopBar user={user} ActiveLesson={handleLessonSelect}/>
          <div className="d-flex">
            {/* <SideBar setActiveLesson={handleLessonSelect} /> */}
            <WorkingArea activeLesson={activeLesson} content={content} title={title}/>
          </div>
        </>
      ) : (
        <>
          {console.log("User not found")}
          <TopBar user={LoadingUser} ActiveLesson={handleLessonSelect}/>
          <div className="d-flex">
            {/* <SideBar ActiveLesson={handleLessonSelect} /> */}
            <WorkingArea activeLesson={activeLesson} content={content} title={title}/>
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
