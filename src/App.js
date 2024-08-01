// App.js
import React from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import LandingPage from './landing';
// import Login from './login';
import './App.css'; // Ensure to import your CSS

function App() {
  return (
    <div className="App">
      <LandingPage/>
    </div>
  );
}

export default App;


// App.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LandingPage from './landing';
// import Login from './login'; // Import your Login component
// import './App.css'; // Ensure to import your CSS

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/landing" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
