import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateRecipe from "../../Pages/Recipe/UpdateRecipe";
import { deleteRecipe } from "../../Pages/store/slices/recipesSlice";
import { BACKEND_URL } from "../../config/config";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

export default function RecipeCard({ recipe, expanded, setExpanded }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      dispatch(deleteRecipe(recipe._id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (id) => {
    setOpenModal(true);
  };
  return (
    <>
      <div
        className={` ${
          darkMode ? "bg-black" : "bg-white "
        } m-2 p-4 shadow-lg rounded-lg min-w-[300px] max-w-[300px] md:max-w-[700px]`}
        // style={{ maxWidth: "400px", minWidth: "400px" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#B81D33] text-white rounded-full h-10 w-10 flex items-center justify-center">
              {recipe.recipeName.charAt(0)}
            </div>
            <div className="ml-4 text-lg font-semibold">
              {recipe.recipeName}
            </div>
          </div>
          {user._id === recipe?.user?._id && (
            <div className="flex space-x-2">
              <EditIcon onClick={handleEdit} />
              <TrashIcon onClick={handleDelete} />
            </div>
          )}
        </div>
        <div className="flex justify-center my-4">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-96 h-60 object-cover rounded"
          />
        </div>
        <div>
          <p className="text-base">{recipe.description}</p>
          <p className="">{recipe.category}</p>
        </div>
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
            <div className="my-4">
              <p className="font-semibold">Created By:</p>
              <p className="">{recipe?.user?.username}</p>
            </div>
          </div>
        )}
      </div>

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
