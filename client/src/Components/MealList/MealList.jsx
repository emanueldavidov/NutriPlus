import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal, fetchAllMeals } from '../../Pages/store/slices/mealSlice';
import { BACKEND_URL } from '../../config/config';

export default function MealList({ dishes,setDishes }) {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.user._id);
  const recipeIds = dishes?.map(recipe => recipe._id);
  const [mealName, setMealName] = React.useState(''); 
  const [error,setErrorMessage]=React.useState(''); 

  if (!dishes || !Array.isArray(dishes)) {
    return null; // Handle case where dishes is not defined or not an array
  }

  // Separate dishes by category
  const starters = dishes.filter(dish => dish.category === 'starter');
  const mainCourse = dishes.filter(dish => dish.category === 'main course');
  const dessert = dishes.filter(dish => dish.category === 'dessert');

  const handleMealSave = async () => {
    console.log('Saving meal:', dishes);
    if (!mealName) {
      setErrorMessage('Please enter a meal name.');
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/meal/meals`, {
        recipes: recipeIds, // Send array of recipe IDs
        user: userID,
        name: mealName, // Include mealName in the request body
      });
      dispatch(fetchAllMeals());
      console.log('Meal saved:', dishes);
      setDishes([])
    } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            setErrorMessage("Meal already exists. Please try again.");
          }
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
    }
  };


  return (
    <div>
      {/* Starters List */}
      {starters.length > 0 && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Starters
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
                          sx={{ display: 'inline' }}
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
                {index < starters.length - 1 && <Divider variant="inset" component="li" />}
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
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
                          sx={{ display: 'inline' }}
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
                {index < mainCourse.length - 1 && <Divider variant="inset" component="li" />}
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
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
                          sx={{ display: 'inline' }}
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
                {index < dessert.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      {/* Save Meal Button */}
      {dishes.length > 0 && (
        <div>
          <Typography variant="h6" component="h2" gutterBottom>
            Enter Meal Name:
          </Typography>
          <TextField
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              label="Meal Name"
              fullWidth
              variant="outlined"
              margin="normal"
              className="input-field"
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B81D33",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B81D33",
                  },
                },
              }}
            />


          {error && (
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {error}
            </Alert>
          )}
          <Button
            onClick={handleMealSave}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: '10px',
              backgroundColor: '#B81D33',
              '&:hover': {
                backgroundColor: '#B81D33',
              },
            }}
          >
            Save Meal
          </Button>
        </div>
      )}
    </div>
  );
}
