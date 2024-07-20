import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

export default function MealsList({ dishes }) {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setErrorMessage] = useState("");

  useEffect(() => {
    setFetchedRecipes([]);
    fetchRecipes();
  }, [dishes]);

  const fetchRecipes = async () => {
    const tempRecipes = [];
    for (let i = 0; i < dishes.recipes.length; i++) {
      try {
        tempRecipes.push(dishes.recipes[i]);
      } catch (error) {
        console.error("Get recipes failed:", error);
        setErrorMessage("Failed to fetch recipes.");
      }
    }
    setFetchedRecipes(tempRecipes);
  };

  // Separate dishes by category
  const starters = useMemo(
    () => fetchedRecipes.filter((dish) => dish.category === "starter"),
    [fetchedRecipes]
  );
  const mainCourse = useMemo(
    () => fetchedRecipes.filter((dish) => dish.category === "main course"),
    [fetchedRecipes]
  );
  const dessert = useMemo(
    () => fetchedRecipes.filter((dish) => dish.category === "dessert"),
    [fetchedRecipes]
  );
  
  console.log("dessert",dessert)
  return (
    <div>
      {/* Starters List */}
      {starters.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Starters
          </Typography>
          <List sx={{ width: "100%" }}>
            {starters.map((dish, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={dish.recipeName} src={dish.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dish.recipeName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dish.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < starters.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {/* Main Course List */}
      {mainCourse.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Main Course
          </Typography>
          <List sx={{ width: "100%" }}>
            {mainCourse.map((dish, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={dish.recipeName} src={dish.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dish.recipeName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dish.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < mainCourse.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {/* Dessert List */}
      {dessert.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Dessert
          </Typography>
          <List sx={{ width: "100%" }}>
            {dessert.map((dish, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={dish.recipeName} src={dish.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dish.recipeName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {dish.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < dessert.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {error && (
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {error}
        </Alert>
      )}
    </div>
  );
}
