import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Modals() {
    const[data,setdata]=useState("")
    const[name,setname]=useState("")
    const[read,setread]=useState(200);
    const[vanish,setvanish]=useState("block")
  
    useEffect(()=>{
        const showfull=async()=>{
              try {
                const recipeId=window.localStorage.getItem("recipeId")
                const response=await axios.get(`http://localhost:3001/recipes/${recipeId}`)
         
                setdata(response.data);
       
                const userId=response.data.userOwner;
                const user=await axios.get(`http://localhost:3001/auth/${userId}`)
                setname(user.data.username)
              
              } catch (error) {
                console.log(error)
              }
        }
       
        showfull()
       
        

    },[])
    const readmore=(event)=>{

      setread(data.instructions.length)
   
      event.preventDefault();

      setvanish("none")
    }
 
  return (
    <div className='modal'>
    
      <h1 style={{fontSize:"6rem",fontFamily: `Francois One`,fontWeight:"bolder",transform:"translate(10rem,18rem)"}}>
       {data.name?.toUpperCase()}
      </h1>
  <div className="recipe-info-1">
    
  
      <div className="text-modal" style={{width:"70%",padding:"3rem 3rem"}}>
      <div style={{margin:"0rem 0 rem"}}>
      <h1 className='bottom' style={{fontSize:"4rem",fontFamily: `Francois One`,fontWeight:"bolder",fontSize:"6rem"}}>    
        {data.name}   
       </h1>
     
          </div>
          <div className='instructions' style={{margin:"0,0",display:"inline-block"}}>
            <p classname="inst" style={{width:"70%",margin:"0px 0px",fontSize:"1.8rem"}}>
              <h1 style={{fontSize:"4rem",fontWeight:"bolder"}} className='bottom'> Instructions</h1>
            
            {data.instructions?.slice(0,read)}
         { data.instructions?.length>200 ? <a href=" " style={{display:`${vanish}`}} onClick={readmore}>read more</a>:<span></span>}
    
            
            </p>

          </div>
          <div className='show-ing'>
            <li className='show-ing' >
           <span>  <h2 style={{display:"inline",fontSize:"4rem"}} className='bottom'>
             Ingredients Used
              </h2></span> 
            
              {data.ingredients?.map((ingredient)=>(
                <li style={{fontSize:"1.7rem"}}>{ingredient}</li>
              ))}
            </li>
          </div>
          <p>
            <h2  style={{fontSize:"4rem"}} className='bottom'>
              Cooking Time
              </h2>
              <span style={{fontSize:"2.5rem"}}>{Math.trunc(data.cookingTime/60)}hour {data.cookingTime%60} mins</span>
              
          </p>
          <p style={{fontSize:"1.5rem"}}>
        <h2>
        Recipe by {name}
        </h2>
          </p>
      </div>
         
            <img className="food-img" src={data.imageUrl} alt="" />
         
        
       </div>

    </div>
  )
}
