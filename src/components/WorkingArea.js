import React, { useEffect } from 'react';

const WorkingArea = ({ activeLesson, content }) => {
  useEffect(() => {
    // Log the activeLesson and content to verify they are being received correctly
    console.log('Active Lesson:', activeLesson);
    console.log('Content:', content);
  }, [activeLesson, content]);

  return (
    <div className="working-area">
      {activeLesson ? (
        <div>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          {/* Add other content fields as needed */}
        </div>
      ) : (
        <div>Please select a lesson from the sidebar.</div>
      )}
    </div>
  );
};

export default WorkingArea;
