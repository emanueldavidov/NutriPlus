import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import RecipeCard from '../RecipeCard/RecipeCard';
import { useMediaQuery } from '@mui/material';

export function RecipeCarousel({ recipes }) {

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [expandedState, setExpandedState] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const maxSteps = recipes.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      setExpandedState(false); // Collapse details on scroll

      // Check if there's a next card to move to
      if (prevActiveStep + 1 < maxSteps && recipes[prevActiveStep + 1]) {
        return prevActiveStep + 1;
      } else {
        // Move to the previous card if next is undefined
        return Math.max(prevActiveStep - 1, 0);
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      setExpandedState(false); // Collapse details on scroll

      // Check if there's a previous card to move to
      if (prevActiveStep - 1 >= 0 && recipes[prevActiveStep - 1]) {
        return prevActiveStep - 1;
      } else {
        // Move to the next card if previous is undefined
        return Math.min(prevActiveStep + 1, maxSteps - 1);
      }
    });
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    setExpandedState(false); // Collapse details on scroll
  };

  return (
    <Box
      sx={{
        maxWidth: isMobile ? 350 : 700,
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 'auto', // Center the box horizontally
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: isMobile ? 350 : 700,
          marginBottom: 2, // Add some margin between the buttons and the carousel
        }}
      >
        <Button
          sx={{ color: "#B81D33" }}
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
        <Button
          sx={{ color: "#B81D33" }}
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </Box>
     
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        sx={{
          backgroundColor:"transparent",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {recipes.map((recipe, index) => (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <RecipeCard
                recipe={recipe}
                expanded={expandedState}
                setExpanded={setExpandedState}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
    </Box>
  );
}

export default RecipeCarousel;
