import React, { useState } from 'react';
import './App.css';
import {} from './Login.js'

function App() {
  return (
    <div className="App">
      <div className="sidebar">
          <div className="logo">Team5</div>
          <div className = "login">Login</div>
          <div className="menu">
              <a href="/">Home</a>
              <a href="#">Issue</a>
              <a href="#">Analysis</a>
          </div>
      </div>
      <div className="content">
          {/*게시판 */}
      </div>
    </div>
  );
}

export default App;
