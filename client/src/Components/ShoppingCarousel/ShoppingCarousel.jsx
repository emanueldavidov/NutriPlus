// ShoppingCarousel Component: Carousel component for navigating through shopping items.
//
// Key Features:
// - Allows users to scroll through a list of shopping items using a swipeable carousel.
// - Supports navigation with "Next" and "Back" buttons.
// - Integrates with Redux to fetch and display shopping items.
// - Adapts to dark mode based on the current theme setting.

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import ShoppingCard from "../ShoppingCard/ShoppingCard";

// The ShoppingCarousel component displays a series of shopping items in a carousel format.
// Users can navigate through the items using swipe gestures or buttons.

export function ShoppingCarousel() {
  // Retrieves the list of shopping items from the Redux store.
  const shoppings = useSelector((state) => state.shopping.shoppingList);

  // activeStep state keeps track of the currently displayed shopping item in the carousel.
  const [activeStep, setActiveStep] = useState(0);

  // Retrieves the dark mode setting from the Redux store.
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // useEffect hook resets the activeStep to 0 whenever the shopping list changes.
  useEffect(() => {
    setActiveStep(0);
  }, [shoppings]);

  // maxSteps stores the total number of shopping items in the list.
  const maxSteps = shoppings.length;

  // handleNext function advances to the next shopping item in the carousel.
  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, maxSteps - 1)
    );
  };

  // handleBack function moves to the previous shopping item in the carousel.
  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      Math.max(prevActiveStep - 1, 0)
    );
  };

  // handleStepChange function directly sets the activeStep to the specified step.
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[350px] md:max-w-[700px]">
      {/* Navigation buttons for moving between shopping items */}
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

      {/* SwipeableViews component enables swiping between shopping items */}
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
