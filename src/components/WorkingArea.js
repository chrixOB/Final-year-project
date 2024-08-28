import React from 'react';
import CodeEditor from './CodeEditor'; // Ensure the path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import QuizHolder from './QuizHolder';

const WorkingArea = ({ selectedLesson, content, title }) => {
  // Ensure content is defined and is a string
  const isStringContent = typeof content === 'string';

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ marginTop: '13%' }}>
      {title && <h2 className="mb-4">{title}</h2>}
      {isStringContent ? (
        <div className="content-area p-4" style={{ backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
          {content && content.split('. ').map((para, index) => (
            <p key={index} className={`lesson-paragraph paragraph-${index + 1} mb-4`}>
              {para}.
            </p>
          ))}
          {/* Render PythonEditor unconditionally */}
          <CodeEditor />
          <div style={{minHeight:'20px', border:"2px solid green"}}><QuizHolder/></div>
        </div>
      ) : (
        <>
        <div>{content}</div>
        <div>hellllooooooo</div>
        </>
      )}
    </div>
  );
};

export default WorkingArea;
