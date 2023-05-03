import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { userGetUserId } from '../hooks/useGetUserId';
import {BsClockHistory} from 'react-icons/bs';

export default function Save() {
  const userId=userGetUserId()
  const[savedRecipes,setsaved]=useState([])
 
  useEffect(()=>{
   

    const fetchsavedrecipe= async()=>{
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        );
        console.log(response.data);
        setsaved(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
  }



 
    fetchsavedrecipe();
  },[]);


  
 
  return (
    <div>
     <h1 style={{fontSize:"4rem",display:"flex",justifyContent:"center"}}>
      Saved Recipes
     </h1>
     <div className='saved-holder'>
      {savedRecipes.map((recipe)=>(
        <div key={recipe._id} id={recipe._id} className='recipe-card'  
        
     
        
        >
   

         

       
          <div>
            <img src={recipe.imageUrl} className='rec-img' alt="" />
          </div>





       <div className="recipe-info">
       <div >
      <h1 className='heading' style={{color:"   #3D550C",transform:"translateX(2rem)"}} >    {recipe.name}   
       </h1>
      
      
          </div>
        
         
         
          <p className='cook-time'>
            
            <span className='cook-time'> <BsClockHistory/> {recipe.cookingTime} mins</span>
          </p>
        
       </div>
       
          
        </div>
      ))}
     </div>
    </div>
  )
}
