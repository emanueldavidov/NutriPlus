// MealCarousel Component: Carousel component for navigating through meal options.
// 
// Key Features:
// - Allows users to scroll through a list of meal cards.
// - Includes smooth transitions and responsive behavior.
// - Integrates with state management to update selected meal data.

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import MealCard from "../MealCard/MealCard";

export function MealCarousel({ meals }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Retrieve the dark mode state from Redux
  const [activeStep, setActiveStep] = useState(0); // State to manage the currently active step (meal card)

  // Reset active step to 0 whenever the meals data changes
  useEffect(() => {
    setActiveStep(0);
  }, [meals]);

  const maxSteps = meals.length; // Determine the total number of steps (meal cards) in the carousel

  // Handler to move to the next step in the carousel
  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, maxSteps - 1));
  };

  // Handler to move to the previous step in the carousel
  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  // Handler to change the active step based on user input (e.g., swiping)
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="w-full max-w-[350px] min-w-[350px] md:max-w-[700px] md:min-w-[700px] flex flex-grow justify-center items-center flex-col mx-auto">
      {/* Navigation buttons for the carousel */}
      <div className="flex justify-between w-full min-w-[350px] max-w-[350px] md:max-w-[600px] mb-2">
        <button
          className={`${
            darkMode ? "text-white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          onClick={handleBack}
          disabled={activeStep === 0} // Disable the back button if on the first step
        >
          {"<"} Back
        </button>
        <button
          className={`${
            darkMode ? "text-white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1} // Disable the next button if on the last step
        >
          Next {">"}
        </button>
      </div>

      {/* Render the SwipeableViews carousel */}
      {meals?.length > 0 && (
        <SwipeableViews
          axis="x" // Carousel moves along the horizontal axis
          index={activeStep} // Current active step
          onChangeIndex={handleStepChange} // Update step when user swipes
          enableMouseEvents // Allow mouse events for swiping
          className="w-full flex justify-center items-center"
          style={{ overflow: "hidden" }} // Prevent horizontal overflow of the carousel
        >
          {meals.map((meal, index) => (
            <div
              className={`flex justify-center items-center rounded ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              } `}
              key={index}
              style={{ width: "100%" }} // Ensure the meal card takes full width of the container
            >
              {/* Render the MealCard if it is within 2 steps of the active step */}
              {Math.abs(activeStep - index) <= 2 ? (
                <MealCard meal={meal} />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
      )}
    </div>
  );
}

export default MealCarousel;
