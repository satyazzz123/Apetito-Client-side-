import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';
export default function Auth() {
  const[registered,setregistered]=useState(true)
  const toggle=(e)=>{
    e.preventDefault()
    if (registered) {
      setregistered(false)
    }
    else {
      setregistered(true)
    }
  }
  return (
 <div className="auth-wrapper">
     <div className='auth'>
 {  registered?    <div className='login-component'>
     <Login/>
     </div>

    : <div className="register-component">
     <Register />
     </div>
     
     
     }
     {registered? <span className='move'>new here try joining us <a href="" onClick={toggle}>Signup</a> </span>:  <span className='move'  >Already have an account try logging in <a href=""onClick={toggle}>login</a> </span>}
     
    </div>
   
 </div>
   
  )
}
