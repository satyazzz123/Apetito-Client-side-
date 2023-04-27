import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { userGetUserId } from '../hooks/useGetUserId';

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
     <h1>
      Saved Recipes
     </h1>
     <ul>
      {savedRecipes.map((recipe)=>(
        <li key={recipe._id}>
      
          <div>
      <h2>    {recipe.name}</h2>
     
          </div>
          <div className='instructions'>
            <p>{recipe.instructions}</p>

          </div>
          <div>
            <img src={recipe.imageUrl} alt="" />
          </div>
          <p>
            {recipe.cookingTime}
          </p>
        </li>
      ))}
     </ul>
    </div>
  )
}
