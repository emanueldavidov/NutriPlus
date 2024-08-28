// RecipeCarousel Component: Carousel component for navigating through recipe options.
//
// Key Features:
// - Allows users to scroll through a collection of recipe cards.
// - Supports swipeable navigation, making it intuitive on touch devices.
// - Integrates with Redux for theme management (dark mode).
// - Automatically collapses expanded details when navigating between cards.

import * as React from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import RecipeCard from "../RecipeCard/RecipeCard";

// The RecipeCarousel component is responsible for displaying a collection of recipes 
// in a swipeable carousel format. Users can navigate between different recipe cards 
// and view details for each recipe.

export function RecipeCarousel({ recipes }) {
  // activeStep state keeps track of the currently displayed recipe in the carousel.
  const [activeStep, setActiveStep] = React.useState(0);

  // expandedState controls whether the details of the current recipe card are expanded or collapsed.
  const [expandedState, setExpandedState] = React.useState(false);

  // useSelector hook retrieves the dark mode setting from the Redux store.
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // maxSteps stores the total number of recipes available in the carousel.
  const maxSteps = recipes.length;

  // handleNext function advances to the next recipe in the carousel if it exists.
  // It also collapses any expanded details before moving to the next card.
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

  // handleBack function moves to the previous recipe in the carousel if it exists.
  // It also collapses any expanded details before moving to the previous card.
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

  // handleStepChange function directly sets the activeStep to the specified step.
  // It also collapses any expanded details when changing steps.
  const handleStepChange = (step) => {
    setActiveStep(step);
    setExpandedState(false); // Collapse details on scroll
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[90%] md:max-w-[700px] m-auto">
      {/* Navigation buttons for moving between recipe cards */}
      <div className="flex justify-between w-full mb-2">
        <button
          className={`${darkMode ? "text-white" : "text-[#B81D33]"} p-2 disabled:opacity-30`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {"<"} Back
        </button>
        <button
          className={`${darkMode ? "text-white" : "text-[#B81D33]"} p-2 disabled:opacity-30`}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next {">"}
        </button>
      </div>

      {/* SwipeableViews component enables swiping between recipe cards */}
      <SwipeableViews
        axis={"x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        className="w-full flex items-center justify-center"
      >
        {recipes.map((recipe, index) => (
          <div key={index} className="w-full flex items-center justify-center">
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
