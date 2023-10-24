import {useEffect, useState} from 'react';
function App(){
  const [data, setData] = useState([{}]);
  useEffect(()=>{
    fetch("/").then(res=>res.json())
    .then(
      msg => setData(msg)
    );
  }, []);
  const getUsers=() => {
    console.log("onclick event...");
    fetch("/users").then(res=>res.json())
    .then(
      msg => setData(msg)
    );
  };
  return(
    <div>
      <button onClick={getUsers}>회원정보 조회</button>
      {(typeof data.users === 'undefined') ? (
        <h1>회원정보 없음.</h1>
      ) : (
        data.users.map((user, i)=>(
          <li key={i}>{user}</li>
        ))
      )}
    </div>
  )
}
export default App;