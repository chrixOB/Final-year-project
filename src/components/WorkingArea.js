import React from 'react';
import IframeEditor from './IframeEditor';
import 'bootstrap/dist/css/bootstrap.min.css';


const WorkingArea = ({ activeLesson, content, title, goToNextLesson}) => {
  // Safeguard to ensure selectedLesson is defined
  const isLesson = activeLesson?.startsWith("lesson");
  console.log("Selected lesson: " + activeLesson)

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center align-text-left" style={{ marginTop: '13%' }}>
      {title && <h2 className="mb-4">{title}</h2>}
      <div className="content-area p-4" style={{ backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
        {content}
        {isLesson && <IframeEditor />}
      </div>
    </div>
  );
};

export default WorkingArea;
