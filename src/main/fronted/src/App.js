import './App.css';
import Board from "./Components/Board";
import BoardDetail from "./Components/BoardDetail";
// yarn add react-router-dom
import {Route, Routes} from 'react-router-dom';
import Signup from "./page/Signup";
import MenuBar from "./Components/MenuBar";
import React from "react";
import Project from "./page/Project";
import Issue from "./page/Issue";

function App() {
  return (
      <div className="App">
          <MenuBar/>
              <Routes>
                  <Route path="/" element={<Project/>} />
                  <Route path="/page/Issue" element={<Issue/>} />
                  <Route path="/page/Issue/board" element={<BoardDetail/>} />
                  <Route path="/page/Signup" element={<Signup/>} />
              </Routes>
      </div>
  );
}

export default App;
