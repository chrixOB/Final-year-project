import React, { useEffect } from 'react';

const WorkingArea = ({ activeLesson, content, title }) => {
  useEffect(() => {
    // Log the activeLesson and content to verify they are being received correctly
    console.log('Active Lesson:', activeLesson);
    console.log('title:', title)
    console.log('Content:', content);
  }, [activeLesson, title, content]);

  return (
    <div className="working-area" style={{border:'2px solid black', marginTop:'5rem', marginLeft:'7rem'
    }}>
      {activeLesson ? (
        <div style={{minWidth:'600px', minHeight:'600px', marginLeft:''}}>
          <h2 style={{fontSize:'2.5rem',
          textAlign:'center'
          }}>{title}</h2>
          <p>{content}</p>
          {/* Add other content fields as needed */}
        </div>
      ) : (
        <div>Please select a lesson from the sidebar.</div>
      )}
    </div>
  );
};

export default WorkingArea;
