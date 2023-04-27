import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { userGetUserId } from '../hooks/useGetUserId';
import {useCookies} from 'react-cookie';

import 'react-medium-image-zoom/dist/styles.css';
import { userRecipeId } from '../hooks/useRecipeId';
import { useNavigate } from 'react-router-dom';
import {BsFillArrowUpCircleFill} from 'react-icons/bs'

export default function Home() {
  const userId=userGetUserId()
  const recipeId=userRecipeId()
  const[recipes,setrecipes]=useState([])
  
  const[savedRecipes,setsaved]=useState([])

  const[cookies,setCookies]=useCookies(["access_token"]);

  const navigate=useNavigate()
  const[name,setsearch]=useState("")
  useEffect(()=>{
    const fetchrecipe= async()=>{
        try {
          const response=await axios.get("http://localhost:3001/recipes")
          setrecipes(response.data)
     
      
        } catch (error) {
          console.log(error);
        }
    }


    const fetchsavedrecipe= async()=>{
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );
        
        setsaved(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
  }



    fetchrecipe();
    fetchsavedrecipe();
  },[]);


  const savedRecipe=async(recipeId)=>{
    try {
      const response=await axios.put("http://localhost:3001/recipes",{recipeId,userId},{headers:{authorization:cookies.access_token}})
      console.log(response);
      setsaved(response.data.savedRecipes);

  
    } catch (error) {
      console.log(error);
    }
  }
  const isalreadysaved=(id)=>savedRecipes.includes(id)
const unsaverecipe=async(recipeId)=>{
  try {
     const response= await axios.delete(`http://localhost:3001/recipes/${userId}`)
      setsaved(response)
      console.log(response.data);

  } catch (error) {
    console.log(error);
  }

}

 
  const showRecipeid=async(recipeId)=>{
  
  
    window.localStorage.setItem("recipeId",recipeId);
      navigate("/show-modals")
  }


  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    
    });
  };


// const searchrecipe=async (e)=>{
// try {
//   e.preventDefault()
//   const response= await axios.post("http://localhost:3001/recipes/search",{
//     name
//   })
//   console.log(name);
//   console.log(response.data);
//   // navigate(`/${response.data.name}`)

// } catch (error) {
//   console.log(error);

  
// }
// }

 

  
  
  return (
    <div style={{margin:"0rem 0",padding:"8rem 0"}}>
     <h1 className='heading' style={{  color: "#3D550C",fontSize:"5rem",display:"flex",justifyContent:"center",margin:"0 0",fontFamily: "monospace",fontWeight:"bolder"}}>
      Our latest Recipes
     </h1>
   
 <form action="" method="post" className='search-form'>

 <input type="search" name='search' placeholder='search for recipes here' onChange={(e)=>{setsearch(e.target.value)}} value={name} id='search'/>

  
 </form>
  
     <ul style={{display:"flex",flexDirection:"column",}} className='home-recipe'>
      {recipes
      .filter((recipe)=>{
          return name.toLowerCase()===""?recipe:name.toLowerCase().includes(recipe.name.toLowerCase())
      })
      .map((recipe)=>(
        <div key={recipe._id} id={recipe._id}  style={{display:"flex",padding:"5rem 0"}}  
        
        onClick={()=>{showRecipeid(recipe._id)}}
        
        >
   

         

       
          <div>
            <img src={recipe.imageUrl} className='rec-img' alt="" />
          </div>





       <div className="recipe-info">
       <div style={{display:"flex"}}>
      <h1 className='heading' style={{color:"   #3D550C"}} >    {recipe.name}   
       </h1>
       <div>
       <button className='save'  onClick={()=>{savedRecipe(recipe._id)}} disabled={isalreadysaved(recipe._id)} style={{zIndex:"100"}}>{isalreadysaved(recipe._id)?`Favourited `:`Favourite`}</button>
     
       </div>
      
          </div>
         
          {/* <div className='show-ing'>
            <li className='show-ing' >
           <span>  <h2 style={{display:"inline"}} className='heading' >
             Ingredients Used
              </h2></span> 
            
              {recipe.ingredients.map((rec)=>( <li  style={{display:"flex"}} className='ing-li' >{rec},</li> ))}
            </li>
          </div> */}
          <p>
            <h2 className='heading' >
              Cooking Time
              </h2>
            <span className='cook-time'>           {recipe.cookingTime} mins</span>
          </p>
        
       </div>
       
          
        </div>
      ))}
     </ul>
    <BsFillArrowUpCircleFill className='arrow-up' onClick={scrollToTop}/>
    </div>
  )
}
