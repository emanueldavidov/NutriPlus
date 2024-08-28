// MealCard Component: Displays meal information in a card format.
// 
// Key Features:
// - Displays key details about a meal such as name, calories, and ingredients.
// - May include an image or icon representing the meal.
// - Supports actions like editing or deleting the meal via icons or buttons.

import * as React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMeals } from "../../Pages/store/slices/mealSlice";
import { useTheme } from "@emotion/react";
import UpdateMeal from "../../Pages/Meal/UpdateMeal";
import { BACKEND_URL } from "../../config/config";
import MealsList from "../MealsList/MealsList";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

export default function MealCard({ meal }) {
  const dispatch = useDispatch(); // To dispatch actions to the Redux store
  const [updateModal, setUpdateModal] = React.useState(false); // State to manage the visibility of the update modal
  const [expanded, setExpanded] = React.useState(false); // State to manage the expansion of the meal details
  const theme = useTheme(); // Access the current theme (e.g., dark mode)
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Get the current dark mode state from Redux

  // Function to handle the deletion of a meal
  const handleDelete = async () => {
    try {
      if (!confirm('Are you sure you want to delete?')) return; // Confirm before deleting
      const response = await axios.delete(
        `${BACKEND_URL}/api/meal/meals/${meal._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllMeals()); // Refresh the list of meals after deletion
      alert("Meal deleted successfully");
    } catch (err) {
      console.error("Error deleting meal:", err);
    }
  };

  // Function to open the update modal
  const handleUpdate = () => setUpdateModal(true);

  // Function to toggle the expansion of the meal details
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={`min-w-[350px] max-w-[350px] md:max-w-[600px]`}>
        {/* Header section displaying meal name and action icons */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="bg-[#B81D33] text-white rounded-full w-10 h-10 flex items-center justify-center">
              {meal.name.charAt(0)} {/* Displays the first letter of the meal's name */}
            </div>
            <h2 className="ml-4">{meal.name}</h2> {/* Displays the meal's name */}
          </div>
          <div className="flex space-between">
            <EditIcon onClick={handleUpdate} /> {/* Edit icon triggers the update modal */}
            <TrashIcon onClick={handleDelete} /> {/* Trash icon triggers the delete function */}
          </div>
        </div>

        {/* Section displaying the list of dishes/ingredients */}
        <div className="">
          <MealsList dishes={meal} />
        </div>
      </div>

      {/* Conditional rendering of the UpdateMeal modal */}
      {updateModal && (
        <UpdateMeal
          meal={meal}
          openModal={updateModal}
          handleModalClose={() => {
            setUpdateModal(!updateModal);
          }}
        />
      )}
    </>
  );
}
