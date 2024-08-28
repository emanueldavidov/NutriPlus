// NutritionRow Component: Renders a row of nutritional data, used within the NutritionCard.
// 
// Key Features:
// - Displays individual nutrition facts such as protein, carbs, and fats.
// - Styled for consistency within a table or card layout.
// - Supports dynamic content based on the selected meal or ingredient.

import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/config";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

export default function NutritionRow({ nutritionItem }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Get the current dark mode state from Redux
  const dispatch = useDispatch(); // To dispatch actions to the Redux store
  const [updateModal, setUpdateModal] = React.useState(false); // State to manage the visibility of the update modal

  // Function to handle the deletion of a nutrition item
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/nutrition/nutritions/${nutritionItem._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllNutrition()); // Refresh the list of nutrition items after deletion
      alert("Nutrition deleted successfully");
    } catch (err) {
      console.error("Error deleting nutrition:", err);
    }
  };

  // Function to open the update modal
  const handleUpdate = () => setUpdateModal(true);

  return (
    <>
      <tr style={{ color: darkMode ? "white" : "black" }}>
        {/* Render individual nutritional data in table cells */}
        <td data-label="Recipe"> {nutritionItem?.food?.recipeName}</td>
        <td data-label="Fats"> {nutritionItem?.fat}g</td>
        <td data-label="Protein"> {nutritionItem?.protein}g</td>
        <td data-label="Calories"> {nutritionItem?.calories}</td>
        <td data-label="Actions">
          {/* Action buttons for editing or deleting the nutrition item */}
          <div className="actions flex ">
            <EditIcon onClick={handleUpdate} aria-label="edit" />
            <TrashIcon onClick={handleDelete} aria-label="delete" />
          </div>
        </td>
      </tr>

      {/* Conditional rendering of the UpdateNutrition modal */}
      {updateModal && (
        <UpdateNutrition
          nutrition={nutritionItem}
          openModal={updateModal}
          handleModalClose={() => {
            setUpdateModal(!updateModal);
          }}
        />
      )}
    </>
  );
}
