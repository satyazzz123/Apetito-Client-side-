import React, { useState } from 'react';
import axios from 'axios';
import { userGetUserId } from '../hooks/useGetUserId';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
export default function Create() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate()
  const userId = userGetUserId()
  const [recipe, setrecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId
  })

  const handlechange = (event) => {
    const { name, value } = event.target
    setrecipe({ ...recipe, [name]: value })
  }
  const handleingchange = (event, index) => {
    const { value } = event.target
    const ingredients = recipe.ingredients;
    ingredients[index] = value
    setrecipe({ ...recipe, ingredients })

  }
  const adding = () => {
    setrecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
  }
  const onsubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:3001/recipes", recipe, { headers: { authorization: cookies.access_token } }
      )
      alert("recipe")
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
    ;
  return (
    <div className='create-recipe'>
     <div className="create-overlay">
     <h2 style={{ display: "flex", justifyContent: "center", fontSize: "3.2rem" }}>Add a Recipe</h2>
      <div className="form-holder" style={{ display: "flex", justifyContent: "center" }}>
        <form action="" style={{ display: "flex", flexDirection: "column", fontSize: "2.5rem", width: "50%" }} onSubmit={onsubmit}>
          <label htmlFor="name" style={{}}>Recipe Title</label>
          <input className='create-input' type="text" id='name' onChange={handlechange} name="name" placeholder='Give your recipe a title' />

          <label htmlFor="ing" style={{}}>Ingredients</label>
          <button onClick={adding} type="button" style={{ margin: "2rem", padding: "1rem" }}>add ingredients      <span style={{fontWeight:"bolder"}}>+</span></button>
          {recipe.ingredients.map((ingredient, index) => (

            <input className='create-input' type="text" id='ing' name='ingredients' key={index} value={ingredient} onChange={(event) => handleingchange(event, index)} placeholder='e.g. cups flour,sifted etc' />
          ))
          }

          <label htmlFor="ins" style={{}}>Instructions</label>
          <textarea type="text" id='ins' name='instructions' onChange={handlechange} className='create-input' placeholder='share the story behind your recipe and what makes it special' > </textarea>

          <label htmlFor="img" style={{}}>Url of the image of recipe</label>
          <input className='create-input' type="text" id='img' name='imageUrl' onChange={handlechange} placeholder="add an image URL to your dish" />

          <label htmlFor="coo" style={{}}>Cooking time</label>
          <input className='create-input' type="number" id='coo' name='cookingTime' onChange={handlechange} placeholder='time estimated to make the dish' />
          <button type='submit' style={{ padding: "1rem", margin: "2rem 0" }}>Create Recipe</button>
        </form>
      </div>
     </div>
    </div>
  )
}
