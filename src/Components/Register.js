import React, { useState } from 'react'
import axios from 'axios'
export default function Register() {
  const[username,setusername]=useState("");
  const[password,setpassword]=useState("");
  const onsubmit=async(event)=>{
  event.preventDefault();
    try {
      const response=await axios.post("http://localhost:3001/auth/register",{
        username,password
      })
   
      if(response.data.user!==null){
        let a=document.getElementById("username-2");
        let b=document.createElement("span");
        b.setAttribute("id","wrong-1")
        b.innerText=("Username already exits try a new username");
        b.style.color="red"
        b.style.fontSize="1.5rem"
        if(a.childElementCount==2){
          a.appendChild(b)}
       
      }
      else{
        let a=document.getElementById("username-2");
        let b=document.createElement("span");
        b.setAttribute("id","wrong-1")
        b.innerText=("Registraton Successfull");
        b.style.color="green"
        b.style.fontSize="1.5rem"
    
          a.appendChild(b)}
       
      
     
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}
  return (
    <div>
      <form action="" onSubmit={onsubmit}>
        <h2 style={{display:"flex",justifyContent:"center"}}>Register</h2>
       <div className="form-group" id='username-2'>
       <label htmlFor="username">Username:</label>
        <input placeholder='Enter username' type="text" id='username' onChange={(event)=>{setusername(event.target.value)}}  value={username}/>
       </div>
       <div className="form-group">
       <label htmlFor="password">Password:</label>
        <input placeholder='Enter your password' type="text" id='password' onChange={(event)=>{setpassword(event.target.value)}} value={password} />
       </div>
     <div className='log-btn' style={{display:"flex",justifyContent:"center"}}>
     <button   type='submit'>Register</button>
     </div>
      </form>
    
    </div>
  )
}
