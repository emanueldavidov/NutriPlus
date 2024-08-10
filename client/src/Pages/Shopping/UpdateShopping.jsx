import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCarousel from "../../Components/ShoppingCarousel/ShoppingCarousel";
import { fetchAllRecipes } from "../store/slices/recipesSlice";
import { fetchAllShoppingLists } from "../store/slices/shoppingSlice";
import "./Shopping.css";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { fetchAllMeals } from "../store/slices/mealSlice";
import { BACKEND_URL } from "../../config/config";

const UpdateShopping = ({ openModal, handleModalClose, shopping }) => {
  const [shoppingListName, setShoppingListName] = useState(shopping?.name);
  const [selectedFood, setSelectedFood] = useState();
  const [selectedShoppingList, setSelectedShoppingList] = useState([]);
  const [ingredients, setIngredients] = useState(shopping?.items); //contains all ingredients
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const userID = useSelector((state) => state.auth.user._id);
  const recipes = useSelector((state) => state.recipes.recipes);
  const meals = useSelector((state) => state.meals.meals);

  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientMap = new Map(
        ingredients.map((ing) => [`${ing.ingredient}-${ing.unit}`, ing])
      );

      // Iterate over each meal and their recipes' ingredients
      selectedShoppingList.forEach((meal) => {
        meal?.recipes.forEach((recipe) => {
          recipe?.ingredients.forEach((ingredient) => {
            const key = `${ingredient.ingredient}-${ingredient.unit}`;
            if (ingredientMap.has(key)) {
              // If ingredient already exists, add to its quantity
              const existing = ingredientMap.get(key);
              ingredientMap.set(key, {
                ingredient: ingredient.ingredient,
                quantity: existing.quantity + ingredient.quantity,
                unit: ingredient.unit,
              });
            } else {
              // Otherwise, add the new ingredient to the Map
              ingredientMap.set(key, {
                ingredient: ingredient.ingredient,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
              });
            }
          });
        });
      });

      // Convert the Map back to an array
      const items = Array.from(ingredientMap.values());

      const res = await axios.put(
        `${BACKEND_URL}/api/shopping/${userID}/shoppingLists/${shopping._id}`,
        {
          name: shoppingListName,
          items: items.flat(),
        }
      );
      handleModalClose();
      dispatch(fetchAllShoppingLists());
    } catch (err) {
      console.error("Failed to update shopping list:", err);
    }
  };

  // Fetch all shopping lists for the user
  useEffect(() => {
    // dispatch(fetchAllRecipes());
    dispatch(fetchAllMeals());
    dispatch(fetchAllShoppingLists());
  }, []);

  const handleFoodSelection = () => {
    if(!selectedFood) return;
    const tempList = [...selectedShoppingList];
    tempList.push(meals.find((meal) => meal._id === selectedFood));
    setSelectedShoppingList(tempList);
  };

  const handleFoodRemove = (index) => {
    const tempList = [...selectedShoppingList];
    tempList.splice(index, 1);
    setSelectedShoppingList(tempList);
  };

  const handleIngredientRemove = (index) => {
    const tempList = [...ingredients];
    tempList.splice(index, 1);
    setIngredients(tempList);
  };

return (
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
      className={`modal-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${darkMode?"bg-black":"bg-white"} shadow-lg p-4`}
    >
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        className="modal-title"
      >
        Update Shopping List Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          type="text"
          value={shoppingListName}
          onChange={(e) => setShoppingListName(e.target.value)}
          label="Shopping List Name"
          fullWidth
          variant="outlined"
          margin="normal"
          className="input-field"
          sx={{
            marginBottom: "10px",
          }}
        />
        <div className="flex items-center">
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="food-label">Select Meal</InputLabel>
            <Select
              labelId="food-label"
              id="food"
              label="Select Food"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              {meals?.length > 0 &&
                meals.map((r) => {
                  return <MenuItem value={r._id}>{r.name}</MenuItem>;
                })}
            </Select>
          </FormControl>
          <AddIcon fontSize="large" onClick={handleFoodSelection} />
        </div>
        {selectedShoppingList?.length > 0 && (
          <>
            <Typography variant="h6">Selected Food:</Typography>
            <List>
              {selectedShoppingList.map((food, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <div className="flex items-center justify-between">
                        <span className={darkMode ? "text-white" : "text-black"}>
                          {food.name}
                        </span>
                        <CloseIcon onClick={() => handleFoodRemove(index)} />
                      </div>
                    }
                    secondary={
                      <span className={darkMode ? "text-white" : "text-gray-500"}>
                        {food.recipes.map(({ ingredients }) => {
                          return ingredients.map((ing) => {
                            return `${ing.ingredient} ${ing.quantity} ${ing.unit}`;
                          });
                        })}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
        {ingredients?.length > 0 && (
          <>
            <Typography variant="h6">Existing Ingredients:</Typography>
            <List>
              {ingredients.map((ing, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <div className="flex items-center justify-between">
                        <span className={darkMode ? "text-white" : "text-black"}>
                          {ing.ingredient}
                        </span>
                        <CloseIcon onClick={() => handleIngredientRemove(index)} />
                      </div>
                    }
                    secondary={
                      <span className={darkMode ? "text-white" : "text-gray-500"}>
                        {ing.quantity} {ing.unit}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

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
          Update Shopping List
        </Button>
      </form>
    </div>
  </Modal>
);

};

export default UpdateShopping;
