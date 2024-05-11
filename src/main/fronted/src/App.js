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
          <div className="sidebar">
              <div className="logo">Team5</div>
              <div className="login">
                  <form action="/member/login" method="post">
                      아이디: <input type="text" name="memberEmail"/> <br/>
                      비밀번호: <input type="password" name="memberPassword"/> <br/>
                      <input type="submit" value="로그인"/>
                      <a href="/member/save">회원가입</a>
                  </form>
              </div>
              <div className="menu">
                  <a href="/">Home</a>
                  <a href="#">Issue</a>
                  <a href="#">Analysis</a>
              </div>
          </div>
          {/*content를 나중에 component로 변경바람*/}
          <div className="root">
              <div className="table">
                  <div className="head">
                      <div className="row">
                          <div className="cell">Title</div>
                          <div className="cell">Description</div>
                          <div className="cell">Reporter</div>
                          <div className="cell">ReportedDate</div>
                          <div className="cell">Comment</div>
                          <div className="cell">History</div>
                      </div>
                  </div>
                  <div className="body">
                      <div className="cell">{hello}</div>
                      <div className="cell">{hello}</div>
                      <div className="cell">{hello}</div>
                      <div className="cell">{hello}</div>
                      <div className="cell">{hello}</div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;
