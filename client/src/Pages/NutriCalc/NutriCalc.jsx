import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NutritionCarousel from "../../Components/NutritionCarousel/NutritionCarousel";
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllNutrition } from "../store/slices/nutritionSlice";
import { fetchAllRecipes } from "../store/slices/recipesSlice";

// NutriCalc Component: Nutritional calculator page, allowing users to calculate their dietary intake.
//
// Key Aspects:
// - Calculates nutritional intake based on user inputs.
// - Displays results with detailed breakdowns of nutrients.

const NutritiCalc = () => {
  // State management for form inputs, modal visibility, error messages, and food list.
  const [selectedFood, setSelectedFood] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [protein, setProtein] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  // Access data and dark mode state from the Redux store.
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const recipes = useSelector((state) => state.recipes.recipes);
  const userID = useSelector((state) => state.auth.user._id);
  const nutrition = useSelector((state) => state.nutrition.nutrition);

  // Fetch all recipes and nutrition data on component mount.
  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllNutrition());
  }, [dispatch]);

  // Function to open the modal for adding nutrition details.
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  // Function to close the modal and reset form fields.
  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedFood("");
    setCalories("");
    setTotalFat("");
    setProtein("");
  };

  // Function to handle form submission and add nutrition details.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFoodItem = {
      food: selectedFood,
      calories: calories,
      fat: totalFat,
      protein: protein,
    };
    try {
      await axios.post(
        `${BACKEND_URL}/api/nutrition/${userID}/nutritions`,
        newFoodItem
      );
      dispatch(fetchAllNutrition());
      handleModalClose();
    } catch (e) {
      if (e.name === "AxiosError") {
        setErrorMessage(e?.response?.data?.error);
      } else {
        setErrorMessage("Error saving nutrition");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        {/* Button to open the modal for adding nutrition details */}
        <button
          type="submit"
          className="mt-2 mb-2 bg-[#B81D33] text-white py-2 px-4 rounded hover:bg-[#B81D33]"
          onClick={handleModalOpen}
        >
          Add Nutrition
        </button>

        {/* Modal for entering nutrition details */}
        {openModal && (
          <Dialog open={openModal} onClose={handleModalClose}>
            <div
              className={`w-11/12 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-lg ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <h2 className="text-xl font-bold text-center mb-4">
                Enter Nutritional Details
              </h2>
              {/* Display error message if any */}
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <span className="block sm:inline">{errorMessage}</span>
                  <button
                    onClick={() => setErrorMessage("")}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414l2.934 2.934-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 101.414-1.414L11.828 10l2.934-2.934z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Form for entering nutrition details */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <SelectField
                  label="Select Recipe"
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                >
                  <option disabled value="" selected>
                    Select Recipe
                  </option>
                  {recipes?.length > 0 &&
                    recipes.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.recipeName}
                      </option>
                    ))}
                </SelectField>
                <TextField
                  type="number"
                  value={calories}
                  onChange={(e) =>
                    parseInt(e.target.value) >= 0 || e.target.value === ""
                      ? setCalories(e.target.value)
                      : null
                  }
                  label="Calories"
                  fullWidth
                  variant="outlined"
                  required
                />
                <TextField
                  type="number"
                  value={totalFat}
                  onChange={(e) =>
                    parseInt(e.target.value) >= 0 || e.target.value === ""
                      ? setTotalFat(e.target.value)
                      : null
                  }
                  label="Total Fat"
                  fullWidth
                  variant="outlined"
                  required
                />
                <TextField
                  type="number"
                  value={protein}
                  onChange={(e) =>
                    parseInt(e.target.value) >= 0 || e.target.value === ""
                      ? setProtein(e.target.value)
                      : null
                  }
                  label="Protein"
                  fullWidth
                  variant="outlined"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 mb-2 bg-[#B81D33] text-white py-2 px-4 rounded hover:bg-[#B81D33]"
                >
                  Add Nutrition
                </button>
              </form>
            </div>
          </Dialog>
        )}

        {/* Display the nutrition carousel */}
        <div
          className={`w-full flex flex-wrap justify-center items-center  ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <NutritionCarousel />
        </div>
      </div>
    </div>
  );
};

export default NutritiCalc;
