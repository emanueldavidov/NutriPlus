import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import NutritionsList from "../NutritionsList/NutritionsList";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";
import { Grid, Typography } from "@mui/material";
import { BACKEND_URL } from "../../config/config";

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
        <p className="text-base">
          {nutritionItem.food.recipeName}
        </p>
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
          <button
            onClick={handleUpdate}
            style={{ color: "#B81D33" }}
            aria-label="edit"
          >
            <EditIcon />
          </button>
          <button
            onClick={handleDelete}
            style={{ color: "#B81D33" }}
            aria-label="delete"
          >
            <DeleteIcon />
          </button>
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
