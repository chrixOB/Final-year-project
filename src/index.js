// import App from './App';


// const root = createRoot(document.getElementById('root'));
// root.render(<App />);

// index.js
import React from 'react';
import Signup from './signup';
import Home from './home';
import Login from "./login"
import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Main from './main';
import GoogleLoginButton from './GoogleLoginButton';
import {
  createBrowserRouter,
  RouterProvider,
  // Route
} from "react-router-dom";
import './App.css'; // Ensure to import your CSS
// import LandingPage from './landing';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "main",
    element: <Main/>,
  },
  {
    path: "GoogleLoginButton",
    element: <GoogleLoginButton/>,
  },
  {
    path: "Signup",
    element: <Signup/>,
  },
  {
    path: "home",
    element: <Home/>,
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(
 <RouterProvider router={router}/>
);
