import React, { useEffect } from 'react';
import CustomMedia from '../../Components/CustomMedia/CustomMedia';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../store/slices/recipesSlice';
import { setMeals } from '../store/slices/mealSlice';
import { BACKEND_URL } from '../../config/config';

// HomePage Component: Homepage of the app, providing an overview and navigation to key sections.
//
// Key Features:
// - Greets the user and displays the app logo.
// - Fetches and stores recipes and meals data from the backend.
// - Displays navigation options to different app sections, styled according to the current theme.

const HomePage = () => {
  // Dispatch function from Redux to trigger actions in the store.
  const dispatch = useDispatch();

  // Fetching user ID, recipes, meals, and dark mode status from the Redux store.
  const userID = useSelector((state) => state.auth.user._id);
  const recipes = useSelector((state) => state.recipes.recipes);
  const meals = useSelector((state) => state.meals.meals);
  const user = useSelector((state) => state.auth.user);
  const isDarkMode = useSelector((state) => state.darkMode.darkMode);

  // useEffect hook runs on component mount to fetch recipes and meals.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/recipe/recipes`);
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
    };

    fetchRecipes();
    fetchMeals();
  }, [dispatch, userID]);

  // Data array for CustomMedia component, defining navigation items with images, titles, and links.
  const data = [
    {
      src: 'make-a-recipe.png',
      title: (
        <div className={`rounded inline-block ${isDarkMode ? 'bg-[#535353] text-white' : 'bg-white text-black'}`}>
          Share a Recipe!
        </div>
      ),
      link: "/recipe"
    },
    {
      src: 'plan-a-meal.png',
      title: (
        <div className={`rounded inline-block ${isDarkMode ? 'bg-[#535353] text-white' : 'bg-white text-black'}`}>
          Plan a Meal!
        </div>
      ),
      link: "/meal"
    },
    {
      src: 'shopping-list.png',
      title: (
        <div className={`rounded inline-block ${isDarkMode ? 'bg-[#535353] text-white' : 'bg-white text-black'}`}>
          Shopping List!
        </div>
      ),
      link: "/shopping"
    },
    {
      src: 'nutrition-calc.png',
      title: (
        <div className={`rounded inline-block ${isDarkMode ? 'bg-[#535353] text-white' : 'bg-white text-black'}`}>
          Nutritional Calculator!
        </div>
      ),
      link: "/nutrition"
    }
  ];

  return (
    <>
      {/* Greeting the user by username */}
      <div className="flex justify-center mt-5 font-bold">
        Hello {user.username}!
      </div>
      {/* Displaying the app logo */}
      <div className="mb-2.5 mt-2.5 flex justify-center">
        <img className="max-w-[100px] h-auto" src="/logo.png" alt="Logo" />
      </div>
      {/* CustomMedia component to display navigation options */}
      <CustomMedia data={data} />
    </>
  );
}

export default HomePage;
