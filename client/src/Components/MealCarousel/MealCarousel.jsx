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

  const maxSteps = meals.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, maxSteps - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="w-full max-w-[350px] min-w-[350px] md:max-w-[700px] md:min-w-[700px] flex flex-grow justify-center items-center flex-col mx-auto">
      <div className="flex justify-between w-full min-w-[350px] max-w-[350px] md:max-w-[600px] mb-2">
        <button
          className={`${
            darkMode ? "text-white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {"<"} Back
        </button>
        <button
          className={`${
            darkMode ? "text-white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next {">"}
        </button>
      </div>

      {meals?.length > 0 && (
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="w-full flex justify-center items-center"
          style={{ overflow: "hidden" }} // Ensures the carousel does not overflow horizontally
        >
          {meals.map((meal, index) => (
            <div
              className={`flex justify-center items-center rounded ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              } `}
              key={index}
              style={{ width: "100%" }} // Ensures the meal card takes full width of the container
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
