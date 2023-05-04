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
        if(a.childElementCount===2){
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
    <div className='auth-comp'>
    <form action="" onSubmit={onsubmit}>
      <h2 style={{display:"flex",justifyContent:"center",transform:"translateY(2rem)",color:"white"}}>Signup</h2>
     <div className="form-group"id='username-2'>
   
      <input placeholder='Enter your username' style={{margin:"0 2rem"}} type="text" id='username' onChange={(event)=>{setusername(event.target.value)}}  value={username}/>
     </div>
     <div className="form-group">
   
      <input placeholder='Enter your password' type="password" id='password' onChange={(event)=>{setpassword(event.target.value)}} value={password} />
     </div >
    <div style={{display:"flex",justifyContent:"center"}} className='log-btn'>
    <button type='submit' ><span style={{color:"white",fontWeight:"bolder"}}>Signup</span></button>
    </div>
    </form>
  
  </div>
  )
}
