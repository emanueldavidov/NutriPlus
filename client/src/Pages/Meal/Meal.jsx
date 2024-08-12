import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  TextField,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MealCarousel from "../../Components/MealCarousel/MealCarousel";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import { fetchAllMeals } from "../store/slices/mealSlice";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios"; // Import Axios
import { BACKEND_URL } from "../../config/config";

const Meal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [selectedDish, setSelectedDish] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const meals = useSelector((state) => state.meals.meals);
  const dishes = useSelector((state) => state.recipes.recipes);
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRecipes());
    dispatch(fetchAllMeals());
  }, []);
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedDish(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (recipes?.length === 0) {
        return setErrorMessage("Please select atleast one recipe");
      }
      const payload = {
        name: foodName,
        user: user._id,
        recipes: recipes.map((f) => f._id),
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/meal/meals`,
        payload
      );
      dispatch(fetchAllMeals());
      setOpenModal(false); // Close the modal
    } catch (error) {
      console.log("Error occured", error);
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage("Meal already exists. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleDishChange = (e) => {
    const selectedRecipe = dishes.find(
      (dish) => dish.recipeName === e.target.value
    );
    setSelectedDish(selectedRecipe);
  };
  const handleDeleteRecipe = (index) => {
    const tempFood = [...recipes];
    tempFood.splice(index, 1);
    setRecipes(tempFood);
  };
  const handleAddNewRecipe = () => {
    if (!selectedRecipe) return;
    const rec = dishes.find((r) => r._id === selectedRecipe);
    setRecipes([...recipes, rec]);
  };

  return (
    <div className=" flex flex-col items-center justify-center p-5">
      <Button
        type="button"
        variant="contained"
        color="primary"
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          backgroundColor: "#B81D33",
          color: "#fff", // Ensure text color is visible
        }}
        onClick={handleModalOpen}
      >
        Add Meal
      </Button>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="food-details-modal"
        aria-describedby="modal-for-entering-food-details"
        BackdropProps={{
          invisible: true, // Hides the backdrop
        }}
      >
        <div
          className={`absolute w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-xl rounded-lg ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } max-h-[90vh] min-h-[300px] overflow-y-auto border-2 border-[#B81D33]`}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            className="text-[#B81D33] text-center mb-5"
          >
            Add Meal
          </Typography>
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Meal Name"
              value={foodName ?? ""}
              onChange={(e) => setFoodName(e.target.value)}
              fullWidth
              className="mb-2"
            />
            <div className="flex items-center mb-2">
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="food-name-label">Add Recipe</InputLabel>
                <Select
                  value={selectedRecipe}
                  onChange={(e) => setSelectedRecipe(e.target.value)}
                  labelId="food-name-label"
                  label="Food Name"
                  required
                >
                  {dishes.map((dish) => (
                    <MenuItem key={dish._id} value={dish._id}>
                      {dish.recipeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <AddIcon
                fontSize="large"
                onClick={handleAddNewRecipe}
                className="ml-2"
              />
            </div>
            <List className="w-full">
              {recipes?.length > 0 &&
                recipes.map((dish, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={dish.recipeName} src={dish.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={dish.recipeName}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            className="text-primary"
                          >
                            {dish.description}
                          </Typography>
                        }
                      />
                      <CloseIcon
                        onClick={() => handleDeleteRecipe(index)}
                        className="cursor-pointer"
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
            </List>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-2 mb-2 bg-custom-red hover:bg-custom-red text-white"
              // onClick={handleModalOpen}
              style={{ backgroundColor: "#B81D33" }}
            >
              Add Meal
            </Button>
            
          </form>
        </div>
      </Modal>

      <div className="meal-list">
        <MealCarousel meals={meals} />
      </div>
    </div>
  );
};

export default Meal; // Export the Meal component as the default export
