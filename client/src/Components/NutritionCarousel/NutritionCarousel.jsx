// NutritionCarousel Component: Carousel component for navigating through nutritional information.
//
// Key Features:
// - Allows users to scroll through different nutrition cards.
// - Includes responsive design for various screen sizes.
// - Integrates with state management for tracking selected nutrition items.

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NutritionRow from "../NutritionCard/NutritionRow";

// The NutritionCarousel component displays a table of nutritional information 
// and allows users to navigate through different nutrition cards.
// It integrates with the Redux store to fetch and display data.

export function NutritionCarousel() {
  // useSelector hook retrieves the list of nutrition items from the Redux store.
  const nutrition = useSelector((state) => state.nutrition.nutrition);
  
  // The totals object aggregates the total fats, protein, and calories across all nutrition items.
  const totals = nutrition.reduce(
    (acc, item) => ({
      totalFats: acc.totalFats + Number(item.fat),
      totalProtein: acc.totalProtein + Number(item.protein),
      totalCalories: acc.totalCalories + Number(item.calories),
    }),
    { totalFats: 0, totalProtein: 0, totalCalories: 0 }
  );

  // activeStep state keeps track of the currently displayed nutrition item.
  const [activeStep, setActiveStep] = useState(0);

  // useEffect hook resets the activeStep to 0 whenever the nutrition list changes.
  useEffect(() => {
    setActiveStep(0);
  }, [nutrition]);

  // maxSteps is calculated as the length of the nutrition array.
  const maxSteps = nutrition.length;

  // handleNext function increments the activeStep if the next item exists.
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 < maxSteps && nutrition[prevActiveStep + 1]) {
        return prevActiveStep + 1;
      } else {
        return Math.max(prevActiveStep - 1, 0);
      }
    });
  };

  // handleBack function decrements the activeStep if the previous item exists.
  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep - 1 >= 0 && nutrition[prevActiveStep - 1]) {
        return prevActiveStep - 1;
      } else {
        return Math.min(prevActiveStep + 1, maxSteps - 1);
      }
    });
  };

  // handleStepChange function directly sets the activeStep to the specified step.
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // darkMode state determines the text color based on the current theme.
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <div className="min-w-full max-w-full md:min-w-[675px] md:max-w-[800px] m-2 p-4 border rounded shadow-lg">
      <div>
        {/* The table structure displays nutritional data with columns for recipe name, fats, protein, calories, and actions. */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium  uppercase tracking-wider"
              >
                Recipe
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium  uppercase tracking-wider"
              >
                Fats
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium  uppercase tracking-wider"
              >
                Protein
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium  uppercase tracking-wider"
              >
                Calories
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium  uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {/* The NutritionRow component is rendered for each nutrition item. */}
            {nutrition.map((nutritionItem, index) => (
              <NutritionRow key={index} nutritionItem={nutritionItem} />
            ))}
          </tbody>
        </table>

        {/* The chip elements display the total fats, protein, and calories at the bottom of the carousel. */}
        <div className="mt-5 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div
            className={`chip bg-primary px-2 py-1 rounded ${textColor} my-2 md:my-0`}
          >
            Total Fats: {totals.totalFats}g
          </div>
          <div
            className={`chip bg-primary px-2 py-1 rounded ${textColor} my-2 md:my-0`}
          >
            Total Protein: {totals.totalProtein}g
          </div>

          <div
            className={`chip bg-primary px-2 py-1 rounded ${textColor} my-2 md:my-0`}
          >
            Total Calories: {totals.totalCalories}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionCarousel;
