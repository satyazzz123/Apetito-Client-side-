import React from 'react'
import Login from './Login';
import Register from './Register';
export default function Auth() {
  return (
 <div className="auth-wrapper">
     <div className='auth'>
     <div className='login-component'>
     <Login/>
     </div>
     <div className="register-component">
     <Register />
     </div>
     
    </div>
    <div className="image-holder">
     
    </div>
 </div>
   
  )
}
