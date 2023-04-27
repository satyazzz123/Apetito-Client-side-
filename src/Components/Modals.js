import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Modals() {
    const[data,setdata]=useState("")
    const[name,setname]=useState("")
  
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
  return (
    <div>
  <div className="recipe-info">
  <div>
            <img src={data.imageUrl} className='rec-img-modal' alt="" />
          </div>
       <div style={{display:"flex"}}>
      <h1>    {data.name}   
       </h1>
     
          </div>
          <div className='instructions'>
            <p classname="inst"><h2>Recipe instructions</h2>
            
            {data.instructions}
            
            </p>

          </div>
          <div className='show-ing'>
            <li className='show-ing' >
           <span>  <h2 style={{display:"inline"}}>
             Ingredients Used
              </h2></span> 
{/*             
              {data.ingredients.map((ingredient)=>(
                <li>{ingredient}</li>
              ))} */}
            </li>
          </div>
          <p>
            <h2>
              Cooking Time
              </h2>{data.cookingTime} hrs
          </p>
          <p>
            Recipe by {name}
          </p>
        
       </div>

    </div>
  )
}
