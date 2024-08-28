import React, { useState } from 'react';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run-python', {
        code: code,
      });
      setOutput(response.data);
    } catch (error) {
      setOutput('Error: ' + error.response?.data || error.message);
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="50"
        style={{padding:'1%'}}
        placeholder="Write your Python code here..."
      ></textarea>
      <br />
      <button onClick={runCode}>Run Code</button>
      <div style={{background:'black', minHeight:'120px'
        , color:'whitesmoke', marginTop:'15px'}}>{output}</div>
    </div>
  );
};

export default CodeEditor;
