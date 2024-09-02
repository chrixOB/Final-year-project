import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import WorkingArea from './components/WorkingArea';
// import SideBar from './components/SideBar';
import { auth } from './firebase';
import {pylessons} from './pylessons'; // Assuming you have the pylessons object imported

function Main({quizId}) {
  const location = useLocation();
  const [activeLesson, setActiveLesson] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
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
    setTitle(lessonTitle);
  };

  const goToNextLesson = () => {
    // Assuming the quizId is like 'quiz1', 'quiz2', etc.
    const quizNumber = parseInt(quizId.replace('quiz', ''), 10); 
    const nextLessonIndex = quizNumber * 5; // Calculate the next lesson index based on the quiz number

    if (nextLessonIndex < Object.values(pylessons).length) {
      const nextLesson = Object.values(pylessons)[nextLessonIndex];
      handleLessonSelect(`lesson${nextLessonIndex + 1}`, nextLesson.content, nextLesson.title);
    }
  };


  return (
    <div>
      {user ? (
        <>
          {console.log(user)}
          <TopBar user={user} ActiveLesson={handleLessonSelect} />
          <div className="d-flex">
            {/* <SideBar setActiveLesson={handleLessonSelect} /> */}
            <WorkingArea activeLesson={activeLesson} content={content} title={title} goToNextLesson={goToNextLesson} />
          </div>
        </>
      ) : (
        <>
          {console.log("User not found")}
          <TopBar user={LoadingUser} ActiveLesson={handleLessonSelect} />
          <div className="d-flex">
            {/* <SideBar ActiveLesson={handleLessonSelect} /> */}
            <WorkingArea activeLesson={activeLesson} content={content} title={title} goToNextLesson={goToNextLesson} />
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
