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
  <Modal
    open={openModal}
    onClose={handleModalClose}
    aria-labelledby="food-details-modal"
    aria-describedby="modal-for-entering-food-details"
    BackdropProps={{
      invisible: false, // Keep the backdrop visible
    }}
  >
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-lg ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="font-bold text-center mb-4 text-xl">
        Update Nutritional Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full">
          <label id="food-label" className="block text-sm font-medium">
            Food
          </label>
          <select
            disabled
            id="food"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedFood}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0 || e.target.value === "")
                setSelectedFood(e.target.value);
            }}
          >
            {recipes?.length > 0 &&
              recipes.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.recipeName}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Calories</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={calories}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0 || e.target.value === "")
                setCalories(e.target.value);
            }}
            required
            min="0"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Total Fat</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={totalFat}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0 || e.target.value === "")
                setTotalFat(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Protein</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={protein}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0) setProtein(e.target.value);
            }}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 mb-2 bg-[#B81D33] text-white py-2 px-4 rounded hover:bg-[#B81D33]"
        >
          Update Nutrition
        </button>
      </form>
    </div>
  </Modal>
);


}
