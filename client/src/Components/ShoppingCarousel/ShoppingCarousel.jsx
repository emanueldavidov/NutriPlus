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

  const maxSteps = shoppings.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, maxSteps - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      Math.max(prevActiveStep - 1, 0)
    );
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[350px] md:max-w-[700px]">
      <div className="flex justify-between w-full mb-2">
        <button
          className={`p-2 disabled:opacity-30 ${
            darkMode ? "text-white" : "text-[#B81D33]"
          }`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {"<"} Back
        </button>
        <button
          className={`p-2 disabled:opacity-30 ${
            darkMode ? "text-white" : "text-[#B81D33]"
          }`}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next {">"}
        </button>
      </div>

      {shoppings?.length > 0 && (
        <SwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          className="w-full flex justify-center items-center"
          style={{ overflow: "hidden" }} // Ensures no overflow in horizontal direction
        >
          {shoppings.map((shoppingItem, index) => (
            <div
              className={`flex justify-center items-center ${
                Math.abs(activeStep - index) <= 2 ? "" : "hidden"
              }`}
              key={index}
              style={{ width: "100%" }} // Ensure the ShoppingCard takes full width
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
