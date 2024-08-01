import React, { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { useLocation } from 'react-router-dom';

function Home() {
  // eslint-disable-next-line
  const [activeLesson, setActiveLesson] = useState(null);
  const location = useLocation();
 
  const handleLessonSelect = (lessonId) => {
    console.log(`Active lesson: ${lessonId}`);
    setActiveLesson(lessonId);
  };
 
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

  console.log("Card Style:", cardStyle);

  return (
    <>
      <TopBar username={location.state?.email} />

      <SideBar onLessonSelect={handleLessonSelect} />
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="home-content pt-4">
          <div className="w-40 border border-4 border-primary"
            style={cardStyle}>
            <h3>Course Progress(%)</h3>
            <div className="progress" role="progressbar"  aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar bg-info" style={{ width: "20%", color: 'white', 
                fontSize: '1.2rem', height:'100%', padding:'3.5%' }}>20%</div>
            </div>
          </div>
          <div className="w-40 border border-4 border-primary"
            style={cardStyle}>
            <h3>LESSONS COMPLETED</h3>
            <div><h3>5</h3></div>
          </div>
          <div className="w-40 border border-4 border-primary"
            style={cardStyle}>
            <h3>QUIZZES COMPLETED</h3>
            <div><h3>5</h3></div>
          </div>
          <div className="w-40 border border-4 border-primary"
            style={cardStyle}>
            <h3>PROJECTS COMPLETED</h3>
            <div><h3>5</h3></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
