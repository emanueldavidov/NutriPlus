import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Alert,
  Card, CardContent,  Grid, Chip
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector for accessing Redux state
import "./NutriCalc.css";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import axios from "axios";
import { fetchAllNutrition } from "../store/slices/nutritionSlice";
import NutritionCarousel from "../../Components/NutritionCarousel/NutritionCarousel";
import NutritionCard from "../../Components/NutritionCard/NutritionCard";
import { BACKEND_URL } from "../../config/config";

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
    <div>
      <div className="nutri-calc">
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
          onClick={handleModalOpen}
        >
          Add Nutrition
        </Button>

        {openModal && (
          <Modal
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="food-details-modal"
            aria-describedby="modal-for-entering-food-details"
          >
            <div
              className="modal-content"
              style={{
                backgroundColor:darkMode?"black":"white",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
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
                Enter Nutritional Details
              </Typography>
              {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage("")}>
                  {errorMessage}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                >
                  <InputLabel id="food-label">Select Food</InputLabel>
                  <Select
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
                  onChange={(e) => {if(parseInt(e.target.value) >=0 || e.target.value=="")setProtein(e.target.value)}}
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
                  Add Nutrition
                </Button>
              </form>
            </div>
          </Modal>
        )}

        

        <div className="nutrition-list">
          <NutritionCarousel />
        

        </div>
      </div>
    </div>
  );
};

export default NutritiCalc;

