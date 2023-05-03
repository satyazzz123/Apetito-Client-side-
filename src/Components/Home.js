import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { userGetUserId } from '../hooks/useGetUserId';
import {useCookies} from 'react-cookie';

import 'react-medium-image-zoom/dist/styles.css';
import { userRecipeId } from '../hooks/useRecipeId';
import { useNavigate } from 'react-router-dom';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {BsClockHistory} from 'react-icons/bs';
import head from '../Photos/Group 11.png'

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
    <div style={{background:"#ECF87F"}}>
     <div className='header' >
   <div className="overlay">
   <div className='down' style={{  color: "#F9D876",fontSize:"5rem",display:"flex",justifyContent:"center",fontWeight:"bolder"}}> 
     Treat yourself with something good today , you deserve it.
     </div>
     <form action="" method="post" className='search-form'>

<input type="search" name='search' placeholder='search for recipes here' onChange={(e)=>{setsearch(e.target.value)}} value={name} id='search'/>

 
</form>
   </div>
     </div>
     <div className='heading' style={{  color: "#3D550C",fontSize:"5rem",display:"flex",justifyContent:"center",margin:"10rem 0",fontFamily: "monospace",fontWeight:"bolder"}}>
      {/* Our latest Recipes */}

      <img src={head} alt="" />
     </div>
   

  
     <ul  className='home-recipe'>
      {recipes
      .filter((recipe)=>{
          // return name.toLowerCase()===""?recipe:name.toLowerCase().includes(recipe.name.toLowerCase())
          if (name !== "") {
            if (recipe.name.toLowerCase().startsWith(name)) {
              return recipe.name.toLowerCase().startsWith(name)
            }
                 
          }
          else {
            return recipe
          }
      })
      .map((recipe)=>(
        <div key={recipe._id} id={recipe._id} className='recipe-card'  
        
        onClick={()=>{showRecipeid(recipe._id)}}
        
        >
   

         

       
          <div>
            <img src={recipe.imageUrl} className='rec-img' alt="" />
          </div>





       <div className="recipe-info">
       <div >
      <h1 className='heading' style={{color:"   #3D550C",transform:"translateX(2rem)"}} >    {recipe.name}   
       </h1>
      
      
          </div>
          <div className='save'>
          <a className='save'  onClick={()=>{savedRecipe(recipe._id)}} disabled={isalreadysaved(recipe._id)} style={{zIndex:"100"}}>{isalreadysaved(recipe._id)?<BsFillBookmarkFill style={{color:`rgb(251, 210, 0)`}}/>:<BsFillBookmarkFill style={{color:"grey"}}/>}</a>
          </div>
         
         
          <p className='cook-time'>
            
            <span className='cook-time'> <BsClockHistory/> {recipe.cookingTime} mins</span>
          </p>
        
       </div>
       
          
        </div>
      ))}
     </ul>
    <BsFillArrowUpCircleFill className='arrow-up' onClick={scrollToTop}/>
    </div>
  )
}
