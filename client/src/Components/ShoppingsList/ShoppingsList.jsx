import React, { useState, useEffect,useMemo } from "react";
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

export default function ShoppingsList({ items }) {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setErrorMessage] = useState("");


  return (
    <div>
      {/* Ingredients List */}
      {items.length > 0 && (
        <>
          <List sx={{ width: "100%",  }}>
            {items.map((ingredient, index) => (
              <React.Fragment key={ingredient._id}>
                <ListItem alignItems="flex-start">
                 
                  <ListItemText
                    primary={ingredient.ingredient}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {ingredient.quantity} {ingredient.unit}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < ingredient.length - 1 && (
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
