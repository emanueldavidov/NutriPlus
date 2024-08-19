import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import ShoppingCard from "../ShoppingCard/ShoppingCard";

export function ShoppingCarousel() {
  const shoppings = useSelector((state) => state.shopping.shoppingList);
  const [activeStep, setActiveStep] = useState(0);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    setActiveStep(0);
  }, [shoppings]);
  const maxSteps = shoppings.length; // Corrected to use shoppings.length instead of recipes.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      // Check if there's a next card to move to
      if (prevActiveStep + 1 < maxSteps && shoppings[prevActiveStep + 1]) {
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
      if (prevActiveStep - 1 >= 0 && shoppings[prevActiveStep - 1]) {
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
    <div className="flex flex-col items-center justify-center mx-auto max-w-[350px] md:max-w-[700px]">
      <div className="flex justify-between w-full mb-2">
        <button
          className={`${
            darkMode ? "white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {"<"} Back
        </button>
        <button
          className={`${
            darkMode ? "white" : "text-[#B81D33]"
          } p-2 disabled:opacity-30`}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next {">"}
        </button>
      </div>

      {shoppings?.length > 0 && (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="flex justify-center items-center"
        >
          {shoppings.map((shoppingItem, index) => (
            <div
              className={`flex justify-center items-center ${
                Math.abs(activeStep - index) <= 2 ? "" : "hidden"
              }`}
              key={index}
            >
              <ShoppingCard shoppingItem={shoppingItem} />
            </div>
          ))}
        </SwipeableViews>
      )}
    </div>
  );
}

export default ShoppingCarousel;
