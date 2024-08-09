import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../Pages/store/slices/recipesSlice";
import axios from "axios";
import UpdateRecipe from "../../Pages/Recipe/UpdateRecipe";
import { BACKEND_URL } from "../../config/config";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({ recipe, expanded, setExpanded }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
  className={` bg-transparent m-2 p-4 shadow-lg rounded-lg`}
    style={{ maxWidth: "700px", minWidth: "400px" }}
>
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className="bg-[#B81D33] text-white rounded-full h-10 w-10 flex items-center justify-center">
        {recipe.recipeName.charAt(0)}
      </div>
      <div className="ml-4 text-lg font-semibold">{recipe.recipeName}</div>
    </div>
    {user._id === recipe?.user?._id && (
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="text-[#B81D33] hover:text-red-700"
          aria-label="edit"
        >
          <EditIcon />
        </button>
        <button
          onClick={handleDelete}
          className="text-[#B81D33] hover:text-red-700"
          aria-label="delete"
        >
          <DeleteIcon />
        </button>
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
    <p className="text-gray-600">{recipe.category}</p>
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
      <ExpandMoreIcon />
    </button>
  </div>
  {expanded && (
    <div>
      <div className="my-4">
        <p className="font-semibold">Ingredients:</p>
        <ul className="list-disc list-inside">
          {recipe?.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient.ingredient} {ingredient.quantity} ({ingredient.unit})
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4">
        <p className="font-semibold">Instructions:</p>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-gray-600">
              {instruction}
            </li>
          ))}
        </ol>
      </div>
      <div className="my-4">
        <p className="font-semibold">Created By:</p>
        <p className="text-gray-600">{recipe?.user?.username}</p>
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
