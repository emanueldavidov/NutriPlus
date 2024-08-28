import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "../../Components/Buttons/AddIcon";
import SelectField from "../../Components/SelectField";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllMeals } from "../store/slices/mealSlice";
import { fetchAllShoppingLists } from "../store/slices/shoppingSlice";
import DeleteIcon from "../../Components/Buttons/DeleteIcon";

// UpdateShopping Component: Form component for updating shopping item details.
//
// Key Aspects:
// - Includes form validation and submission handling.
// - Interacts with backend services to update shopping item information.

const UpdateShopping = ({ openModal, handleModalClose, shopping }) => {
  // State management for form inputs and the selected items
  const [shoppingListName, setShoppingListName] = useState(shopping?.name);
  const [selectedFood, setSelectedFood] = useState();
  const [selectedShoppingList, setSelectedShoppingList] = useState([]);
  const [ingredients, setIngredients] = useState(shopping?.items); // contains all ingredients

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const userID = useSelector((state) => state.auth.user._id);
  const meals = useSelector((state) => state.meals.meals);

  const dispatch = useDispatch();

  // Handle form submission for updating a shopping list
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aggregate ingredients from selected meals
      const ingredientMap = new Map(
        ingredients.map((ing) => [`${ing.ingredient}-${ing.unit}`, ing])
      );

      // Iterate over each meal and aggregate their ingredients
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

      // Convert the Map back to an array of ingredients
      const items = Array.from(ingredientMap.values());

      // Make a PUT request to update the shopping list
      await axios.put(
        `${BACKEND_URL}/api/shopping/${userID}/shoppingLists/${shopping._id}`,
        {
          name: shoppingListName,
          items: items.flat(),
        }
      );

      // Close the modal and refresh the shopping lists
      handleModalClose();
      dispatch(fetchAllShoppingLists());
    } catch (err) {
      console.error("Failed to update shopping list:", err);
    }
  };

  // Fetch all meals and shopping lists for the user on component mount
  useEffect(() => {
    dispatch(fetchAllMeals());
    dispatch(fetchAllShoppingLists());
  }, [dispatch]);

  // Handle the selection of a meal to add to the shopping list
  const handleFoodSelection = () => {
    if (!selectedFood) return;
    const tempList = [...selectedShoppingList];
    tempList.push(meals.find((meal) => meal._id === selectedFood));
    setSelectedShoppingList(tempList);
  };

  // Handle the removal of a meal from the selected shopping list
  const handleFoodRemove = (index) => {
    const tempList = [...selectedShoppingList];
    tempList.splice(index, 1);
    setSelectedShoppingList(tempList);
  };

  // Handle the removal of an ingredient from the shopping list
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
          {/* Shopping List Name input */}
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

          {/* Meal selection dropdown and add button */}
          <div className="flex items-center">
            <SelectField
              label="Select Meal"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              <option value="">Select Meal</option>
              {meals?.length > 0 &&
                meals.map((r) => {
                  return <option key={r._id} value={r._id}>{r.name}</option>;
                })}
            </SelectField>
            <div className="mt-5 ms-2">
              <AddIcon onClick={handleFoodSelection} />
            </div>
          </div>

          {/* Display selected meals */}
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
                        <div key={ingredients._id}>
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

          {/* Display existing ingredients */}
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

          {/* Submit button for updating the shopping list */}
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
