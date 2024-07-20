import {
  Alert,
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

const Shopping = () => {
  const [shoppingListName, setShoppingListName] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedShoppingList, setSelectedShoppingList] = useState([]);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const userID = useSelector((state) => state.auth.user._id);
  const meals = useSelector((state) => state.meals.meals);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  // Modal handlers
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedShoppingList.length == 0) {
        return setErrorMessage("Please add atleast one meal");
      }
      const ingredientMap = new Map();

      selectedShoppingList.forEach((meal) => {
        meal?.recipes.forEach((recipe) => {
          recipe?.ingredients.forEach((ingredient) => {
            const key = `${ingredient.ingredient}-${ingredient.unit}`;
            if (ingredientMap.has(key)) {
              const existing = ingredientMap.get(key);
              ingredientMap.set(key, {
                ingredient: ingredient.ingredient,
                quantity: existing.quantity + ingredient.quantity,
                unit: ingredient.unit,
              });
            } else {
              ingredientMap.set(key, {
                ingredient: ingredient.ingredient,
                quantity: ingredient.quantity,
                unit: ingredient.unit,
              });
            }
          });
        });
      });

      const items = Array.from(ingredientMap.values());

      const res = await axios.post(
        `${BACKEND_URL}/api/shopping/${userID}/shoppingLists`,
        {
          name: shoppingListName,
          items: items.flat(),
        }
      );
      setShoppingListName("");
      setSelectedFood("");
      setSelectedShoppingList([]);

      handleModalClose();
      dispatch(fetchAllShoppingLists());
    } catch (err) {
      console.error("Failed to create shopping list:", err);
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

  return (
    <div className="shopping-container">
      <Button
        type="button"
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
        Add Shopping List
      </Button>

      {
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
              className="modal-title"
            >
              Enter Shopping List Details
            </Typography>
            {errorMessage && (
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                required
                type="text"
                value={shoppingListName}
                onChange={(e) => setShoppingListName(e.target.value)}
                label="Shooping List Name"
                fullWidth
                variant="outlined"
                margin="normal"
                className="input-field"
                sx={{
                  marginBottom: "10px",
                }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                >
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
                <List>
                  {selectedShoppingList.map((food, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{ color: darkMode ? "#fff" : "black" }}
                            >
                              {food.name}
                            </span>
                            <CloseIcon
                              onClick={() => handleFoodRemove(index)}
                            />
                          </div>
                        }
                        secondary={
                          <span style={{ color: darkMode ? "white" : "grey" }}>
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
                Add to Shopping List
              </Button>
            </form>
          </div>
        </Modal>
      }

      <div className="shopping-list">
        <ShoppingCarousel />
      </div>
    </div>
  );
};

export default Shopping;
