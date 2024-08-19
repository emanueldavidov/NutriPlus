import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "../../Components/Buttons/AddIcon";
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllMeals } from "../store/slices/mealSlice";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import DeleteIcon from "../../Components/Buttons/DeleteIcon";

const UpdateMeal = ({ openModal, handleModalClose, meal }) => {
  const userId = useSelector((state) => state.auth.user._id);
  const [errorMessage, setErrorMessage] = useState("");
  const allRecipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  const [food, setFood] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const fetchMeal = async () => {
    const meals = await axios.get(
      `${BACKEND_URL}/api/meal/${userId}/meals/${meal._id}`
    );
    setFood(meals.data);
  };

  const handleFoodNameChange = (e) => {
    setFood({ ...food, name: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (food.recipes?.length === 0) {
        return setErrorMessage("Please select atleast one recipe");
      }
      const payload = { ...food, recipes: food.recipes.map((f) => f._id) };
      const response = await axios.put(
        `${BACKEND_URL}/api/meal/userId/meals/${meal._id}`,
        payload
      );
      dispatch(fetchAllMeals());
      handleModalClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Meal already exists. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  useEffect(() => {
    fetchMeal();
    dispatch(fetchAllRecipes());
  }, []);
  const handleDeleteRecipe = (index) => {
    const tempFood = { ...food };
    tempFood.recipes.splice(index, 1);
    setFood(tempFood);
  };
  const handleAddNewRecipe = () => {
    if (!selectedRecipe) return;
    const rec = allRecipes.find((r) => r._id === selectedRecipe);
    console.log(rec, selectedRecipe);
    setFood({ ...food, recipes: [...food.recipes, rec] });
  };
  return (
    <Dialog open={openModal} onClose={handleModalClose}>
      <div
        className="p-5 w-4/5 max-w-[600px] mx-auto border-2 border-[#B81D33] rounded-lg max-h-[40rem] max-h-[90vh] min-h-[300px] overflow-y-auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: darkMode ? "black" : "white",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 className="text-xl font-semibold text-[#B81D33] text-center mb-5">
          Update Meal
        </h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm-3.293-2.293a1 1 0 011.414 0L10 7.414l1.879-1.879a1 1 0 111.414 1.414L11.414 9l1.879 1.879a1 1 0 01-1.414 1.414L10 10.414l-1.879 1.879a1 1 0 01-1.414-1.414L8.586 9 6.707 7.121a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Meal Name"
            value={food?.name ?? ""}
            onChange={handleFoodNameChange}
            fullWidth
            sx={{
              marginBottom: "10px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <SelectField
              value={selectedRecipe}
              onChange={(e) => setSelectedRecipe(e.target.value)}
              label="Recipe Name"
            >
              <option value="">Select Recipe</option>
              {allRecipes.map((dish) => (
                <option key={dish._id} value={dish._id}>
                  {dish.recipeName}
                </option>
              ))}
            </SelectField>
            <div className="mt-5 ms-2">
              <AddIcon onClick={handleAddNewRecipe} />
            </div>
          </div>
          <ul className="w-full mt-2">
            {food?.recipes?.length > 0 &&
              food.recipes.map((dish, index) => (
                <li key={index} className="flex items-start mb-4 border-b pb-4">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      alt={dish.recipeName}
                      src={dish.image}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium">{dish.recipeName}</p>
                    <p className="text-sm text-gray-700">{dish.description}</p>
                  </div>

                  <DeleteIcon onClick={() => handleDeleteRecipe(index)} />
                </li>
              ))}
          </ul>

          <button
            type="submit"
            className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
          >
            Update Meal
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateMeal;
