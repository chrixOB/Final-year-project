// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import myImage from './programmer.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import TypingEffect from './TypingEffect';
import Typewriter from "typewriter-effect";

function LandingPage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center text-white"
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(6px)',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      ></div>
      <div className="position-relative" style={{ zIndex: 2}}>
        <p className='' style={{fontSize:'5.2rem',transform:'translateY(-70%)'}}>PyGuide</p>
        {/* <h1 className="display-4 my-auto" style={{position:'static'}}>WELCOME !!!!!</h1> */}
  
  <h1 className="display-4 my-auto" 
  style={{position:'static',color: '#5390eb',transform:'translateY(-40%)'}}>
    Your developer journey begins here</h1>
        

        <div style={{minWidth:'50px', minHeighteight:'50px'}}>
        <h1 className="mt-4 mb-4" style={{position:'static'}} >
        <div className="Typewriter">
            <Typewriter
                options={{
                  loop: true
              }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Start coding today")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Start coding today")
                        .start();
                }}
            />
        </div></h1>  
        </div>
        
        
        <Link to="/login" className="btn mt-4 btn-primary btn-lg" 
        style={{
          borderRadius:"10px",
          position:'static'
          }}>
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
