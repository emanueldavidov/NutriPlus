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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNutrition } from "../../Pages/store/slices/nutritionSlice";
import NutritionsList from "../NutritionsList/NutritionsList";
import UpdateNutrition from "../../Pages/NutriCalc/UpdateNutrition";
import { Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BACKEND_URL } from "../../config/config";
export default function NutritionRow({ nutritionItem }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  console.log(darkMode);
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
          <div className="actions">
            <IconButton
              onClick={handleUpdate}
              sx={{ color: "#B81D33" }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={handleDelete}
              sx={{ color: "#B81D33" }}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
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
