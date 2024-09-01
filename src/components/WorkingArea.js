import React from 'react';
import IframeEditor from './IframeEditor';

const WorkingArea = ({ selectedLesson, content, title }) => {
  // Safeguard to ensure selectedLesson is defined
  const isLesson = selectedLesson?.startsWith("lesson");

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
