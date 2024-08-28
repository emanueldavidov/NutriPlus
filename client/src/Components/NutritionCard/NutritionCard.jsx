// NutritionCard Component: Displays nutritional information in a card format.
//
// Key Features:
// - Shows details like calories, macronutrients, and ingredients.
// - Often used in conjunction with meal or recipe components.
// - Can be expanded or collapsed to show more or less information.

import axios from "axios";
import * as React from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../../config/config";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

// The NutritionCard component accepts a single prop 'nutritionItem', 
// which contains the details of a particular food item (e.g., calories, fat, protein).

export default function NutritionCard({ nutritionItem }) {
  // useDispatch hook is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  
  // useState hook is used to manage the state of the update modal. 
  // The updateModal state is initially set to false (modal closed).
  const [updateModal, setUpdateModal] = React.useState(false);
  
  // handleDelete function: 
  // This asynchronous function is triggered when the user clicks the TrashIcon.
  // It sends a DELETE request to the backend to remove the nutrition item from the database.
  // Upon successful deletion, it dispatches fetchAllNutrition to update the list of nutrition items.
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/nutrition/nutritions/${nutritionItem._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      dispatch(fetchAllNutrition());  // Refreshes the nutrition list after deletion.
      alert("Nutrition deleted successfully");
    } catch (err) {
      console.error("Error deleting nutrition:", err);
    }
  };

  // handleUpdate function: 
  // This function opens the update modal by setting the updateModal state to true.
  const handleUpdate = () => setUpdateModal(true);

  return (
    <>
      {/* The main layout of the NutritionCard component. 
          It uses a grid system to display nutrition information in a structured format. */}
      <div className="grid grid-cols-12 gap-2 mb-1">
        <div className="col-span-2">
          <p className="text-base">{nutritionItem.food.recipeName}</p>
        </div>
        <div className="col-span-2">
          <p className="text-base">{nutritionItem.fat}g</p>
        </div>
        <div className="col-span-2">
          <p className="text-base">{nutritionItem.protein}g</p>
        </div>
        <div className="col-span-2">
          <p className="text-base">{nutritionItem.calories}</p>
        </div>
        <div className="col-span-2 flex">
          {/* Action buttons: 
              - EditIcon triggers the handleUpdate function.
              - TrashIcon triggers the handleDelete function. */}
          <div className="actions flex">
            <EditIcon onClick={handleUpdate} />
            <TrashIcon onClick={handleDelete} />
          </div>
        </div>
      </div>

      {/* Conditional rendering of the UpdateNutrition modal. 
          It appears when updateModal is true. 
          The modal can be closed by toggling the updateModal state. */}
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
