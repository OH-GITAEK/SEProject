import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import MenuBar from "./Components/MenuBar";
import Board from "./Components/Board";
import BoardDetail from "./Components/BoardDetail";
// yarn add react-router-dom
import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';

function App() {
  const [hello, setHello] = useState('No data');

  useEffect(() => {
    axios.get('/api/test')
        .then((res) => {
          setHello(res.data);
        })
  }, []);

  return (
      <div className="App">
          <BrowserRouter>
              <MenuBar/>
              <Routes>
                  <Route path="/" element={<Board/>} />
                  <Route path="/board" element={<BoardDetail/>} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
