import React, { useState } from 'react'
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'
export default function Login() {
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");
    const[cookies,setCookies]=useCookies(["access_token"]);
    const navigate=useNavigate()
    const onsubmit=async(e)=>{
        e.preventDefault();
        try {
         const response= await axios.post("http://localhost:3001/auth/login",{
            username,password
          })


         
          setCookies("access_token",response.data.token);
          window.localStorage.setItem("userId",response.data.userId);
          const a=document.getElementById("wrong")
          console.log(a);
       
          navigate("/")
          // console.log(response.data.token);
          
          if(!response.data.token){
            navigate("/auth")
          }
          if(response.data.token==undefined){
            // alert("not right")
            let a=document.getElementById("username-1");
            let b=document.createElement("span");
            b.setAttribute("id","wrong")
            b.innerText=("Please Fill in proper Credentials");
            b.style.color="red"
            b.style.fontSize="1.5rem"
          if(a.childElementCount==2){
            a.appendChild(b)}
            console.log(a.childElementCount);
            
            
          }
         
        } catch (error) {
          console.error(error);
        }
    }
  return (
    <div>
    <form action="" onSubmit={onsubmit}>
      <h2 style={{display:"flex",justifyContent:"center"}}>Sign-in</h2>
     <div className="form-group"id='username-1'>
     <label htmlFor="username">Username:</label>
      <input placeholder='Enter your username' type="text" id='username' onChange={(event)=>{setusername(event.target.value)}}  value={username}/>
     </div>
     <div className="form-group">
     <label htmlFor="password">Password:</label>
      <input placeholder='Enter your password' type="text" id='password' onChange={(event)=>{setpassword(event.target.value)}} value={password} />
     </div >
    <div style={{display:"flex",justifyContent:"center"}} className='log-btn'>
    <button type='submit' >Login</button>
    </div>
    </form>
  
  </div>
  )
}
