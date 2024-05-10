import React, { useState, Component } from 'react';
import './App.css';
import { useDispatch } from "react-redux";
import { signIn } from "../reducer.userSlice.js";
import axios from "axios";

import '../src/components/Issue.js';
import Issue from './components/Issue.js';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@mui/material/CircularProgress';

// 로그인 컴포넌트
function LoginComponenet(){
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  const [loding, setLoading] = useState(false);
  const {msg, setMsg} = useState("");

}



// 게시판 style
const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

         

  render() {
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
        <Paper className="content">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell>ReportedDate</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.issues ? this.state.issues.map((i) => {
              return (
                <Issue
                  Title={i.Title}
                  Description={i.Description}
                  Reporter={i.Reporter}
                  ReportedDate={i.ReportedDate}
                  Comment={i.Comment}
                  History={i.History}
                />
              );
            }): 
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress/>
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

export default App;
