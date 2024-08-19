import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/config";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

export default function NutritionRow({ nutritionItem }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
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
      dispatch(fetchAllNutrition());
      alert("Nutrition deleted successfully");
    } catch (err) {
      console.error("Error deleting nutrition:", err);
    }
  };
  const handleUpdate = () => setUpdateModal(true);
  return (
    <>
      <tr style={{ color: darkMode ? "white" : "black" }}>
        <td data-label="Recipe"> {nutritionItem?.food?.recipeName}</td>
        <td data-label="Fats"> {nutritionItem?.fat}g</td>
        <td data-label="Protein"> {nutritionItem?.protein}g</td>
        <td data-label="Calories"> {nutritionItem?.calories}</td>
        <td data-label="Actions">
          <div className="actions flex ">
            <EditIcon onClick={handleUpdate} aria-label="edit" />

            <TrashIcon onClick={handleDelete} aria-label="delete" />
          </div>
        </td>
      </tr>

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
