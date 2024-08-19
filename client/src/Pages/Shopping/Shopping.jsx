import { Dialog } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeImage from "../../assets/images/close.svg";
import AddIcon from "../../Components/Buttons/AddIcon";
import SelectField from "../../Components/SelectField";
import ShoppingCarousel from "../../Components/ShoppingCarousel/ShoppingCarousel";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { fetchAllMeals } from "../store/slices/mealSlice";
import { fetchAllShoppingLists } from "../store/slices/shoppingSlice";
import DeleteIcon from "../../Components/Buttons/DeleteIcon";

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

  return (
    <div className="flex flex-col items-center p-5">
      <button
        type="button"
        className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
        onClick={handleModalOpen}
      >
        Add Shopping List
      </button>

      <Dialog open={openModal} onClose={handleModalClose}>
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
          <h2 className="text-xl font-semibold text-[#B81D33] text-center mb-5">
            Enter Shopping List Details
          </h2>

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
              <ul className="w-full mt-4">
                {selectedShoppingList.map((food, index) => (
                  <li
                    key={index}
                    className="mb-4 border-b border-gray-300 pb-4"
                  >
                    <div className="flex items-center justify-between">
                      {/* Food Name */}
                      <span
                        className={`text-lg ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {food.name}
                      </span>
                      {/* Remove Button */}
                      <DeleteIcon onClick={() => handleFoodRemove(index)} />
                    </div>
                    {/* Ingredients List */}
                    <div
                      className={`mt-2 text-sm ${
                        darkMode ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {food.recipes.flatMap(({ ingredients }) =>
                        ingredients.map((ing, i) => (
                          <div key={i} className="ml-4">
                            {`${ing.ingredient}: ${ing.quantity} ${ing.unit}`}
                          </div>
                        ))
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded"
            >
              Add to Shopping List
            </button>
          </form>
        </div>
      </Dialog>

      <div className="shopping-list w-full flex justify-center items-center">
        <ShoppingCarousel />
      </div>
    </div>
  );
};

export default Shopping;
