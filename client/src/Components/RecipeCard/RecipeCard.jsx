import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../../Pages/store/slices/recipesSlice";
import axios from "axios";
import UpdateRecipe from "../../Pages/Recipe/UpdateRecipe";
import { BACKEND_URL } from "../../config/config";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

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

export default function RecipeCard({ recipe, expanded, setExpanded }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/recipe/recipes/${recipe._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Recipe deleted:", response.data);
      dispatch(deleteRecipe(recipe._id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (id) => {
    setOpenModal(true);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: isMobile ? 400 : 700,
          minWidth: isMobile ? 400 : 700,
          backgroundColor: "transparent",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="recipe">
              {recipe.recipeName.charAt(0)} 
            </Avatar>
          }
          action={
            user._id === recipe?.user?._id && (
              <div className="actions">
                <IconButton sx={{ color: "#B81D33" }} aria-label="edit">
                  <EditIcon onClick={handleEdit} />
                </IconButton>

                <IconButton
                  onClick={handleDelete}
                  sx={{ color: "#B81D33" }}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )
          }
          title={recipe.recipeName}
        />
        <CardMedia
          component="img"
          height="350"
          image={recipe.image} // Assuming recipe.image is the URL string
          alt={recipe.name}
          sx={{
            width: isMobile ? "400px": "700px", // Set your desired width
            objectFit: 'cover', // Ensures the image covers the area without distortion
          }}
        />
        <CardContent>
          <Typography variant="body2">{recipe.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.category}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Show More Details</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Ingredients:</Typography>
            <ul>
              {recipe?.ingredients?.map((ingredient, index) => (
                <li key={index}>
                  <Typography variant="body2" color="text.secondary">
                    {ingredient.ingredient} {ingredient.quantity} (
                    {ingredient.unit})
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography paragraph>Instructions:</Typography>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <Typography paragraph variant="body2" color="text.secondary">
                    {instruction}
                  </Typography>
                </li>
              ))}
            </ol>
            <Typography paragraph>Created By:</Typography>
            <ol>
            <Typography paragraph variant="body2" color="text.secondary">
                    {recipe?.user?.username}
                  </Typography>
              
            </ol>
          </CardContent>
        </Collapse>
      </Card>
      {openModal && (
        <UpdateRecipe
          recipe={recipe}
          resetRecipe
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}
