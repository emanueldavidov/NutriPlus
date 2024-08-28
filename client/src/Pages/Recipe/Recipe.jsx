import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCarousel from "../../Components/RecipeCarousel/RecipeCarousel";
import { BACKEND_URL } from "../../config/config";
import { addRecipe, fetchAllRecipes } from "../store/slices/recipesSlice";
import RecipeForm from "./UpdateRecipe";

// Recipe Component: Main page component for displaying detailed recipe information.
//
// Key Aspects:
// - Displays detailed recipe information including ingredients, steps, and nutrition.
// - Supports actions like adding ingredients to a shopping list.

const Recipe = () => {
  // State management for modal visibility, form inputs, and error messages.
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // State for category

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const user = useSelector((state) => state.auth.user);

  // Fetch all recipes when the component mounts.
  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const recipes = useSelector((state) => state.recipes.recipes); // Access Redux state for recipes

  // Modal open and close functions
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    resetForm();
  };

  // Form reset function
  const resetForm = () => {
    setRecipeName("");
    setIngredient("");
    setUnit("");
    setQuantity("");
    setIngredients([]);
    setInstruction("");
    setInstructions([]);
    setImage("");
    setDescription("");
    setErrorMessage("");
    setCategory("");
  };

  // Add ingredient to list
  const handleAddIngredient = () => {
    if (ingredient.trim() !== "" && unit !== "" && quantity) {
      setIngredients([...ingredients, { ingredient, unit, quantity }]);
      setIngredient("");
      setUnit("");
      setQuantity("");
    }
  };

  // Add instruction to list
  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      setInstructions([...instructions, instruction]);
      setInstruction("");
    }
  };

  // Remove instruction from list
  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  // Remove ingredient from list
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Form submission for adding a new recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      recipeName.trim() === "" ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      setErrorMessage("Please fill all required details");
      return;
    }

    const newRecipe = {
      recipeName,
      ingredients,
      instructions,
      image,
      description,
      category,
      user: user._id,
    };

    try {
      // Send POST request to server to add a new recipe
      const response = await axios.post(
        `${BACKEND_URL}/api/recipe/recipes`,
        newRecipe
      );

      // Dispatch action to update Redux store with new recipe
      dispatch(addRecipe(response.data));

      // Clear form fields after submission
      resetForm();
      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving recipe:", error);
      setErrorMessage("Failed to save recipe. Please try again later.");
    }
  };

  return (
    <div className="recipe-container flex flex-col items-center justify-center">
      {/* Button to open the modal for adding a new recipe */}
      <button
        type="button"
        className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
        onClick={handleModalOpen}
      >
        Add Recipe
      </button>

      {/* Modal for adding a new recipe */}
      {openModal && (
        <RecipeForm openModal={openModal} setOpenModal={setOpenModal} />
      )}

      {/* Display the recipe carousel */}
      <div className="w-full flex justify-center items-center">
        {recipes.length > 0 && <RecipeCarousel recipes={recipes} />}
      </div>
    </div>
  );
};

export default Recipe;
