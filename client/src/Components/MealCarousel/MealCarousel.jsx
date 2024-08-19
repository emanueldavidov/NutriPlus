import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import MealCard from "../MealCard/MealCard";

export function MealCarousel({ meals }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    setActiveStep(0);
  }, [meals]);
  const maxSteps = meals.length; // Corrected to use meals.length instead of recipes.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      // Check if there's a next card to move to
      if (prevActiveStep + 1 < maxSteps && meals[prevActiveStep + 1]) {
        return prevActiveStep + 1;
      } else {
        // Move to the previous card if next is undefined
        return Math.max(prevActiveStep - 1, 0);
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      // Check if there's a previous card to move to
      if (prevActiveStep - 1 >= 0 && meals[prevActiveStep - 1]) {
        return prevActiveStep - 1;
      } else {
        // Move to the next card if previous is undefined
        return Math.min(prevActiveStep + 1, maxSteps - 1);
      }
    });
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="w-full max-w-[350px] min-w-[350px] md:max-w-[700px] md:min-w-[700px] flex flex-grow justify-center items-center flex-col mx-auto">
      <div className="flex justify-between w-full min-w-[350px] max-w-[350px] md:max-w-[600px] mb-2">
        <button
          className={`${
            darkMode ? "white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {"<"}Back
        </button>
        <button
          className={`${
            darkMode ? "white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next {">"}
        </button>
      </div>

      {meals?.length > 0 && (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className={`max-w-[600px] flex justify-center items-center  `}
        >
          {meals.map((meal, index) => (
            <div
              className={`flex justify-center items-center rounded ${
                darkMode ? "bg-black " : "bg-white "
              } `}
              key={index}
            >
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
