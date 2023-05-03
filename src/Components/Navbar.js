import React from 'react'
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import logo from "../Photos/Group 8.png"
export default function Navbar() {
  const [cookies,setCookies]=useCookies(["access_token"])
  const navigate=useNavigate();
  
  const logout=()=>{
    setCookies("access_token","");
    window.localStorage.removeItem("userId");
    navigate("/auth")
  }
  return (
    <div>
    
      <div className="nav">
      <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="nav-cont" >
        <a href="/">Home</a>
        <a href="/create-recipe">Create</a>
      
        {!cookies.access_token?(  
        <a href="/auth">Sign-in or Sign-up</a>): <> <a href="/saved-recipes">Saved</a> <a onClick={logout}>Logout</a></>  
        }
        </div>
      
      

      </div>
    </div>
  )
}
