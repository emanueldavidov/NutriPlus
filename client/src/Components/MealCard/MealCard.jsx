import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, styled, Typography, useMediaQuery } from "@mui/material";

import { useDispatch } from "react-redux";
import { deleteMeal, fetchAllMeals } from "../../Pages/store/slices/mealSlice";
import axios from "axios";
import MealList from "../MealList/MealList";
import MealsList from "../MealsList/MealsList";
import UpdateMeal from "../../Pages/Meal/UpdateMeal";
import { BACKEND_URL } from "../../config/config";
import { useTheme } from "@emotion/react";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function MealCard({ meal }) {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const handleDelete = async () => {
    try {
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
  const handleUpdate=()=>setUpdateModal(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
    <Card
      sx={{
        maxWidth: isMobile ? 400 : 700,
        minWidth: isMobile ? 400 : 700,
        background:"transparent",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="meal">
            {meal.name.charAt(0)}
          </Avatar>
        }
        action={
          <div className="actions">
            <IconButton sx={{ color: "#B81D33" }} aria-label="edit">
              <EditIcon onClick={handleUpdate}/>
            </IconButton>

            <IconButton sx={{ color: "#B81D33" }} aria-label="delete">
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </div>
        }
        title={meal.name}
      />
        
      <CardContent>
        <MealsList dishes={meal} />
      </CardContent>
    </Card>
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
