import './App.css';
import Board from "./Components/Board";
import BoardDetail from "./Components/BoardDetail";
// yarn add react-router-dom
import {Route, Routes} from 'react-router-dom';
import Signup from "./page/Signup";
import MenuBar from "./Components/MenuBar";
import React from "react";

function App() {
  return (
      <div className="App">
          <MenuBar/>
              <Routes>
                  <Route path="/" element={<Board/>} />
                  <Route path="/board" element={<BoardDetail/>} />
                  <Route path="/page/Signup" element={<Signup/>} />
              </Routes>
      </div>
  );
}

export default App;
