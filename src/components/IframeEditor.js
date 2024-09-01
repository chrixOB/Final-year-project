import React from 'react';

function IframeEditor() {
  console.log('IframeEditor is rendering');
  return (
    <iframe
      src="https://trinket.io/embed/python/efcad784cd40" // link to trinket IDE
      width="100%"
      height="356"
      // frameBorder="0"
      // marginWidth="0"
      // marginHeight="0"
      allowFullScreen
      title="Embedded Code Editor"
      style={{border:'2px solid green'}}
    ></iframe>
  );
}

export default IframeEditor;
