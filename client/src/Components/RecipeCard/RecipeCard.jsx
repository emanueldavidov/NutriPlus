// RecipeCard Component: Displays recipe information in a card format.

import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateRecipe from "../../Pages/Recipe/UpdateRecipe";
import { deleteRecipe } from "../../Pages/store/slices/recipesSlice";
import { BACKEND_URL } from "../../config/config";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

export default function RecipeCard({ recipe, expanded, setExpanded }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Get the current dark mode state from Redux
  const dispatch = useDispatch(); // To dispatch actions to the Redux store
  const user = useSelector((state) => state.auth.user); // Get the current authenticated user from Redux
  const [openModal, setOpenModal] = useState(false); // State to manage the visibility of the update modal

  // Function to toggle the expansion of the recipe card
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Function to handle the deletion of a recipe
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/recipe/recipes/${recipe._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Recipe deleted:", response.data);
      dispatch(deleteRecipe(recipe._id)); // Remove the deleted recipe from the Redux store
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Function to open the update modal for editing the recipe
  const handleEdit = (id) => {
    setOpenModal(true);
  };

  return (
    <>
      <div
        className={`${
          darkMode ? "bg-black" : "bg-white"
        } m-2 p-4 shadow-lg rounded-lg min-w-[300px] max-w-[300px] md:max-w-[700px]`}
      >
        {/* Header section displaying recipe name and action icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#B81D33] text-white rounded-full h-10 w-10 flex items-center justify-center">
              {recipe.recipeName.charAt(0)} {/* Displays the first letter of the recipe name */}
            </div>
            <div className="ml-4 text-lg font-semibold">
              {recipe.recipeName} {/* Displays the recipe name */}
            </div>
          </div>
          {user._id === recipe?.user?._id && (
            <div className="flex space-x-2">
              <EditIcon onClick={handleEdit} /> {/* Edit icon triggers the update modal */}
              <TrashIcon onClick={handleDelete} /> {/* Trash icon triggers the delete function */}
            </div>
          )}
        </div>

        {/* Image section displaying the recipe image */}
        <div className="flex justify-center my-4">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-96 h-60 object-cover rounded"
          />
        </div>

        {/* Basic recipe details section */}
        <div>
          <p className="text-base">{recipe.description}</p>
          <p className="">{recipe.category}</p>
        </div>

        {/* Expandable section with more details */}
        <div className="flex items-center justify-center my-4">
          <p className="mr-2">Show More Details</p>
          <button
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className={`transform transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {expanded && (
          <div>
            {/* Ingredients list */}
            <div className="my-4">
              <p className="font-semibold">Ingredients:</p>
              <ul className="list-disc list-inside">
                {recipe?.ingredients?.map((ingredient, index) => (
                  <li key={index} className="">
                    {ingredient.ingredient} {ingredient.quantity} (
                    {ingredient.unit})
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions list */}
            <div className="my-4">
              <p className="font-semibold">Instructions:</p>
              <ol className="list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Created by section */}
            <div className="my-4">
              <p className="font-semibold">Created By:</p>
              <p className="">{recipe?.user?.username}</p>
            </div>
          </div>
        )}
      </div>

      {/* Conditional rendering of the UpdateRecipe modal */}
      {openModal && (
        <UpdateRecipe
          recipe={recipe}
          resetRecipe
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}
