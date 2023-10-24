import {useEffect, useState} from 'react';
function App(){
  const [data, setData] = useState([{}]);
  const getUsers=() => {
    console.log("onclick event...");
    fetch("/test/users").then(res=>res.json())
    .then(
      msg => setData(msg)
    )
  };
  return(
    <div>
      <button onClick={getUsers}>회원정보 조회</button>
      {
      data[0].id !== undefined && 
      <table border={1}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이메일</th>
            <th>닉네임</th>
          </tr>
        </thead>
        <tbody>
        {
          data.map((user, i)=>(
            <tr>
              <td key={i}>{user.id}</td>
              <td key={i}>{user.email}</td>
              <td key={i}>{user.nick}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
      }
    </div>
  )
}
export default App;