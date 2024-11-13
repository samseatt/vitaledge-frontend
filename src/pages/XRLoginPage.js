import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import 'aframe';

const XRLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  const [error] = useState('');
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (token) {
      // Token exists, so navigate to XR dashboard
      console.log("Using existing token from localStorage.");
      navigate('/xr/dashboard');
    } else {
      console.log("No token found, user needs to enter credentials.");
      // Handle XR username/password prompt here if needed
    }
  }, [navigate]);

// const handleLogin = () => {
//     console.log("Login clicked"); // Check if this logs to verify click
//     alert("Login Clicked!"); // Extra feedback to verify the click
//   };

  useEffect(() => {
    const loginBox = document.querySelector('#loginBox');
    
    if (loginBox) {
      loginBox.addEventListener('click', handleLogin); // Attach click event
    }
    
    // Cleanup on unmount
    return () => {
      if (loginBox) {
        loginBox.removeEventListener('click', handleLogin);
      }
    };
  }, []); // Empty dependency array

  return (
    <a-scene>
      {/* A cursor entity for desktop interaction */}
      <a-entity cursor="rayOrigin: mouse" raycaster="objects: [data-raycastable]"></a-entity>

      {/* Camera */}
      <a-camera position="0 1.6 0"></a-camera>

      <a-text value="Login" position="0 2 -3" color="#FFFFFF" width="6"></a-text>
      <a-text value={error} position="0 1.5 -3" color="red" width="4"></a-text>

      <a-entity id="username" position="-1 1 -3">
        <a-text value="Username" color="#FFFFFF" position="0 0.3 0"></a-text>
        <a-input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.detail.value)}
          width="2"
        ></a-input>
      </a-entity>

      <a-entity id="password" position="1 1 -3">
        <a-text value="Password" color="#FFFFFF" position="0 0.3 0"></a-text>
        <a-input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.detail.value)}
          width="2"
        ></a-input>
      </a-entity>


      {/* Login Box with event-set and id for direct handling */}
      <a-box 
        id="loginBox"
        color="#4CC3D9" 
        position="0 0.5 -3" 
        width="1" 
        height="0.5" 
        depth="0.5" 
        data-raycastable
        event-set__click="_event: click; color: #FFC65D" // Change color on click for visual feedback
      >
        <a-text 
          value="Login" 
          position="0 0 0.3" 
          align="center" 
          color="#FFFFFF"
        ></a-text>
      </a-box>
    </a-scene>
  );
};

export default XRLoginPage;
