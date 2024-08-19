import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeImage from "../../assets/images/close.svg";
import AddIcon from "../../Components/Buttons/AddIcon";
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllMeals } from "../store/slices/mealSlice";
import { fetchAllShoppingLists } from "../store/slices/shoppingSlice";
import DeleteIcon from "../../Components/Buttons/DeleteIcon";
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
    if (!selectedFood) return;
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
    <Dialog open={openModal} onClose={handleModalClose}>
      <div
        className={`p-5 w-4/5 max-w-[600px] mx-auto border-2 border-[#B81D33] rounded-lg max-h-[40rem] max-h-[90vh] min-h-[300px] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          darkMode ? "bg-black" : "bg-white"
        } shadow-lg p-4`}
      >
        <h2 className="text-xl font-semibold text-[#B81D33] text-center mb-5">
          Update Shopping List Details
        </h2>

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
            className="mb-2.5"
          />
          <div className="flex items-center">
            <SelectField
              label="Select Meal"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="">Select Meal</option>
              {meals?.length > 0 &&
                meals.map((r) => {
                  return <option value={r._id}>{r.name}</option>;
                })}
            </SelectField>
            <div className="mt-5 ms-2">
              <AddIcon onClick={handleFoodSelection} />
            </div>
          </div>
          {selectedShoppingList?.length > 0 && (
            <>
              <h6 className="text-xl font-semibold mb-4">Selected Food:</h6>
              <ul>
                {selectedShoppingList.map((food, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? "text-white" : "text-black"}>
                        {food.name}
                      </span>
                      <DeleteIcon onClick={() => handleFoodRemove(index)} />
                    </div>
                    <div className={darkMode ? "text-white" : "text-gray-500"}>
                      {food.recipes.map(({ ingredients }) => (
                        <div>
                          {ingredients.map((ing, i) => (
                            <div key={i}>
                              {`${ing.ingredient} ${ing.quantity} ${ing.unit}`}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {ingredients?.length > 0 && (
            <>
              <h6 className="text-xl font-semibold mb-4">
                Existing Ingredients:
              </h6>
              <ul>
                {ingredients.map((ing, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? "text-white" : "text-black"}>
                        {ing.ingredient}
                      </span>
                      <DeleteIcon
                        onClick={() => handleIngredientRemove(index)}
                      />
                    </div>
                    <div className={darkMode ? "text-white" : "text-gray-500"}>
                      {ing.quantity} {ing.unit}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <button
            type="submit"
            className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
          >
            Update Shopping List
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateShopping;
