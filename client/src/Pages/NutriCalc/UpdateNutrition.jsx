import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector for accessing Redux state
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllNutrition } from "../store/slices/nutritionSlice";
import { fetchAllRecipes } from "../store/slices/recipesSlice";

const UpdateNutrition = ({ nutrition, openModal, handleModalClose }) => {
  const [selectedFood, setSelectedFood] = useState(nutrition?.food?._id);
  const [calories, setCalories] = useState(nutrition?.calories);
  const [totalFat, setTotalFat] = useState(nutrition?.fat);
  const [protein, setProtein] = useState(nutrition?.protein);
  const dispatch = useDispatch();
  // Access darkMode state from Redux store
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const recipes = useSelector((state) => state.recipes.recipes);
  const userID = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllNutrition());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the entered food details to the list
    const updatedItem = {
      food: selectedFood,
      calories: calories,
      fat: totalFat,
      protein: protein,
    };
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/nutrition/${userID}/nutritions/${nutrition._id}`,
        updatedItem
      );
      handleModalClose();
      dispatch(fetchAllNutrition());
    } catch (e) {
      console.error("Error updating nutrional details:", e);
    }
    // Clear form fields after updating to the list
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleModalClose}
    >
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
        <h2 className="flex flex-col items-center font-bold text-xl mb-4">
          Update Nutritional Details
        </h2>

        <form onSubmit={handleSubmit}>
          <SelectField
            disabled={true}
            labelId="food-label"
            id="food"
            label="Select Food"
            value={selectedFood}
            onChange={(e) => {
              setSelectedFood(e.target.value);
            }}
          >
            {recipes?.length > 0 &&
              recipes.map((r) => {
                return (
                  <option key={r._id} value={r._id}>
                    {r.recipeName}
                  </option>
                );
              })}
          </SelectField>
          <TextField
            type="number"
            value={calories}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0 || e.target.value == "")
                setCalories(e.target.value);
            }}
            label="Calories"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            min="0"
          />
          <TextField
            type="number"
            value={totalFat}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0 || e.target.value == "")
                setTotalFat(e.target.value);
            }}
            label="Total Fat"
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            type="number"
            value={protein}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0) setProtein(e.target.value);
            }}
            label="Protein"
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <button
            type="submit"
            className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
          >
            Update Nutritions
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateNutrition;
