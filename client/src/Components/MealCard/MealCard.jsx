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
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleDelete = async () => {
    try {
      if(!confirm('Are you sure you want to delete?')) return;
      const response = await axios.delete(
        `${BACKEND_URL}/api/meal/meals/${meal._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllMeals());
      alert("Meal deleted successfully");
    } catch (err) {
      console.error("Error deleting meal:", err);
    }
  };
  const handleUpdate = () => setUpdateModal(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <div className={`min-w-[350px] max-w-[350px] md:max-w-[600px]`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="bg-[#B81D33] text-white rounded-full w-10 h-10 flex items-center justify-center">
              {meal.name.charAt(0)}
            </div>
            <h2 className="ml-4">{meal.name}</h2>
          </div>
          <div className="flex space-between">
            <EditIcon onClick={handleUpdate} />
            <TrashIcon onClick={handleDelete} />
          </div>
        </div>

        <div className="">
          <MealsList dishes={meal} />
        </div>
      </div>
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
