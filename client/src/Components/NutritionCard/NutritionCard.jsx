import axios from "axios";
import * as React from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../../config/config";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";

export default function NutritionCard({ nutritionItem }) {
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
          <div className="actions flex">
          <EditIcon onClick={handleUpdate} />
          <TrashIcon onClick={handleDelete} />
          </div>
        </div>
      </div>

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
