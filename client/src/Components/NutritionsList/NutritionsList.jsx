import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function NutritionList({ item }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={"Fats"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.fat}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={"Protein"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.protein}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={"Calories"}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {item.calories}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  );
}

export default NutritionList;
