import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector for accessing Redux state
import NutritionCarousel from "../../Components/NutritionCarousel/NutritionCarousel";
import { BACKEND_URL } from "../../config/config";
import { fetchAllNutrition } from "../store/slices/nutritionSlice";
import { fetchAllRecipes } from "../store/slices/recipesSlice";

const NutritiCalc = () => {
  const [selectedFood, setSelectedFood] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [protein, setProtein] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const dispatch = useDispatch();
  // Access darkMode state from Redux store
  const darkMode = useSelector((state) => state.darkMode.darkMode); 
  const recipes = useSelector((state) => state.recipes.recipes);
  const userID = useSelector((state) => state.auth.user._id);
  const nutrition = useSelector((state) => state.nutrition.nutrition);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllNutrition());
  }, []);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    // Reset form fields when modal is closed
    setSelectedFood("");
    setCalories("");
    setTotalFat("");
    setProtein("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the entered food details to the list
    const newFoodItem = {
      food: selectedFood,
      calories: calories,
      fat: totalFat,
      protein: protein,
    };
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/nutrition/${userID}/nutritions`,
        newFoodItem
      );
      dispatch(fetchAllNutrition());
      setSelectedFood("");
      setCalories("");
      setTotalFat("");
      setProtein("");
      setOpenModal(false);
    } catch (e) {
      if(e.name ==="AxiosError"){
        setErrorMessage(e?.response?.data?.error);
      }else{
        setErrorMessage("Error saving nutrition");
      }
    }
    // Clear form fields after adding to the list
  };

return (
  <div className="flex flex-col items-center h-screen">
    <div className="flex flex-col items-center">
      <button
        type="submit"
        className="mt-2 mb-2 bg-[#B81D33] text-white py-2 px-4 rounded hover:bg-[#B81D33]"
        onClick={handleModalOpen}
      >
        Add Nutrition
      </button>

      {openModal && (
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="food-details-modal"
          aria-describedby="modal-for-entering-food-details"
        >
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-lg ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              className="font-bold text-center"
            >
              Enter Nutritional Details
            </Typography>
            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="food-label">Select Food</InputLabel>
                <Select
                  labelId="food-label"
                  id="food"
                  label="Select Food"
                  value={selectedFood}
                  onChange={(e) =>
                    parseInt(e.target.value) >= 0 || e.target.value === ""
                      ? setSelectedFood(e.target.value)
                      : null
                  }
                >
                  {recipes?.length > 0 &&
                    recipes.map((r) => (
                      <MenuItem key={r._id} value={r._id}>
                        {r.recipeName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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
        </Modal>
      )}

      <div className={`w-full flex flex-wrap justify-center items-center  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <NutritionCarousel />
      </div>
    </div>
  </div>
);

};

export default NutritiCalc;

