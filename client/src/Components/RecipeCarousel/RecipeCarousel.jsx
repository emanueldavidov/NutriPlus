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
  <div className="flex flex-col items-center justify-center max-w-[350px] md:max-w-[700px] flex-grow m-auto">
    <div className="flex justify-between w-full max-w-[350px] md:max-w-[700px] mb-2">
      <button
        className="text-[#B81D33] text-sm disabled:opacity-50"
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        Back
      </button>
      <button
        className="text-[#B81D33] text-sm disabled:opacity-50"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
      >
        Next
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </button>
    </div>

    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
      className="bg-transparent flex items-center justify-center"
    >
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="flex items-center justify-center"
        >
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
  </div>
);

}

export default RecipeCarousel;
