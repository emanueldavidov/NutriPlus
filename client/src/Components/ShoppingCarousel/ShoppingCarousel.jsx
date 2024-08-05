import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

export function ShoppingCarousel() {
  const shoppings=useSelector(state=>state.shopping.shoppingList)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
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
  <div
    className={`flex flex-col items-center justify-center mx-auto ${
      isMobile ? "max-w-[350px]" : "max-w-[700px]"
    }`}
  >
    <div className="flex justify-between w-full mb-2">
      <button
        className="text-[#B81D33] disabled:opacity-50"
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        Back
      </button>
      <button
        className="text-[#B81D33] disabled:opacity-50"
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
      >
        Next
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </button>
    </div>

    {shoppings?.length > 0 && (
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
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
