import * as React from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import RecipeCard from "../RecipeCard/RecipeCard";

export function RecipeCarousel({ recipes }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [expandedState, setExpandedState] = React.useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

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
    <div className="flex flex-col items-center justify-center w-full max-w-[90%] md:max-w-[700px] m-auto">
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
