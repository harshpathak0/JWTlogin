// import React, { useState,useEffect } from 'react'
// import {Link,useNavigate} from 'react-router-dom'
// import axios from 'axios'

// function Home(){
   
//     const [auth, setAuth] = useState(false);
//     const [message, setMessage] = useState('');
//     const [name , setName ] = useState('')
//     axios.defaults.withCredentials = true;

//     const navigate = useNavigate()

    
//     let fetchdata = async ()=>{
//         let res = await  axios.get("http://localhost:8082")
//         console.log("res",res.data.name)
// if(res.data.Status==="Success"){
//     setName(res.data.name)
//     setAuth(true)
//     // navigate('/login')
// }
//     }
//     useEffect(()=>{
//         fetchdata()
//     },[])

    

//     return(
//        <div className='container mt-4'>
//         {
//             auth ?
//             <div>
//                 <h3>You are Authorized ---{name}</h3>
//                 <button className='btn btn-danger'>Logout</button>
//        </div>
//        :
//        <div>
//         <h3>{message}</h3>
//         <h3>Login now</h3>
//         <Link to = "/login" className='btn btn-primary'>Login</Link>
//        </div>
// }
// </div>
//     )
// }
// export default Home;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage]= useState('')
  const [name,setName] = useState('')
  axios.defaults.withCredentials=true;

  

  useEffect(()=>{
    axios.get('http://localhost:8082')
    .then(res => {
      if (res.data.Status ==="Success") {
        setAuth(true)
        setName(res.data.name)
        
      }
      else {
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
     .catch(err => console.log(err));
  },[])

  const handleDelete = () =>{
    axios.get('http://localhost:8082/logout')
    .then (res => {
      window.location.reload(true);

    }).catch(err => console.log(err));
  }
  return (
    <div className='container mt-4'>
      {
       auth ?
       <div>
        <h3> You are Authorized---{name}</h3>
        <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
       </div>
       :
       <div>
          <h1>{message}</h1>
          <h3>Log IN now</h3>
          <Link to="/login" className='btn btn-primary' >Log In</Link>
       </div>
      }
    </div> 
  )
}

export default Home