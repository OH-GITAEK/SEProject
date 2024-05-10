import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// 게시판 테스트내용 
const test = [
  {
  Title: '#1',
  Description: '10h',
  Reporter: '5h',
  ReportedDate: '2h',
  Comment: '0.0',
  History: 'milestone1',
  }
];

class Issue extends React.Component {
  render() {
    return (
      <TableRow>{/*현재 테스트 내용만 올라가도록 구현했습니다.*/}
        <TableCell>{test.Title}</TableCell> {/*제목*/}
        <TableCell>{test.Description}</TableCell> {/*내용*/}
        <TableCell>{test.Reporter}</TableCell>  {/*올린사람*/}
        <TableCell>{test.ReportedDate}</TableCell> {/*날짜*/}
        <TableCell>{test.Comment}</TableCell> {/*답글*/}
        <TableCell>{test.History}</TableCell>
      </TableRow>
    );
  }
}

export default Issue;