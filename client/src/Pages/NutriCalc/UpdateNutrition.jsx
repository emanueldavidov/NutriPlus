import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector for accessing Redux state
import { fetchAllNutrition } from "../store/slices/nutritionSlice";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import "./NutriCalc.css";
import { BACKEND_URL } from "../../config/config";

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
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="food-details-modal"
      aria-describedby="modal-for-entering-food-details"
      BackdropProps={{
        invisible: false, // Hides the backdrop
      }}
    >
      <div
        className="modal-content"
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
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
          Update Nutritional Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="food-label">Food</InputLabel>
            <Select
              disabled={true}
              labelId="food-label"
              id="food"
              label="Select Food"
              value={selectedFood}
              onChange={(e) => {if(parseInt(e.target.value) >=0 || e.target.value=="")setSelectedFood(e.target.value)}}
            >
              {recipes?.length > 0 &&
                recipes.map((r) => {
                  return (
                    <MenuItem key={r._id} value={r._id}>
                      {r.recipeName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={calories}
            onChange={(e) => {if(parseInt(e.target.value) >=0 || e.target.value=="")setCalories(e.target.value)}}
            label="Calories"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            min='0'
          />
          <TextField
            type="number"
            value={totalFat}
            onChange={(e) => {if(parseInt(e.target.value) >=0 || e.target.value=="")setTotalFat(e.target.value)}}
            label="Total Fat"
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            type="number"
            value={protein}
            onChange={(e) => {if(parseInt(e.target.value)>=0)setProtein(e.target.value)}}
            label="Protein"
            fullWidth
            variant="outlined"
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              backgroundColor: "#B81D33",
              "&:hover": {
                backgroundColor: "#B81D33",
              },
            }}
          >
            Update Nutritions
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateNutrition;
