import React, { useEffect } from 'react'
import CustomMedia from '../../Components/CustomMedia/CustomMedia'
import { useDispatch, useSelector } from 'react-redux'
import { setRecipes } from '../store/slices/recipesSlice'
import "./HomePage.css"
import { setMeals } from '../store/slices/mealSlice'
import { BACKEND_URL } from '../../config/config'


const HomePage = () => {
const dispatch = useDispatch();
const userID = useSelector((state) => state.auth.user._id);
const recipes = useSelector((state) => state.recipes.recipes);
const meals = useSelector((state) => state.meals.meals);

 useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const response = await fetch( `${BACKEND_URL}/api/recipe/recipes`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      dispatch(setRecipes(data));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/meal/${userID}/meals`);

      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      dispatch(setMeals(data));
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }


  fetchRecipes();
  fetchMeals();
}, []);
const user=useSelector((state)=>state.auth.user)
    const data = [
        {
          src: 'make-a-recipe.png',
          title: 'Share a Recipe!',
          link:"/recipe"
        },
        {
          src: 'plan-a-meal.png',
          title: 'Plan a Meal!',
          link:"/meal"

        },
        {
          src: 'shopping-list.png',
          title: 'Shopping List!',
          link:"/shopping"
        },
        {
            src: 'nutrition-calc.png',
            title: 'Nutritional Calculator!',
            link:"/nutrition"
        }
      ];
  return (
    <>
    <div className='greeting'>
      Hello {user.username}!
    </div>
    <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        
   <CustomMedia data={data}/>
    </>
  )
}

export default HomePage