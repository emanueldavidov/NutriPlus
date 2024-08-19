import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NutritionRow from "../NutritionCard/NutritionRow";

export function NutritionCarousel() {
  const nutrition = useSelector((state) => state.nutrition.nutrition);
  const totals = nutrition.reduce(
    (acc, item) => ({
      totalFats: acc.totalFats + Number(item.fat),
      totalProtein: acc.totalProtein + Number(item.protein),
      totalCalories: acc.totalCalories + Number(item.calories),
    }),
    { totalFats: 0, totalProtein: 0, totalCalories: 0 }
  );
  
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    setActiveStep(0);
  }, [nutrition]);
  const maxSteps = nutrition.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 < maxSteps && nutrition[prevActiveStep + 1]) {
        return prevActiveStep + 1;
      } else {
        return Math.max(prevActiveStep - 1, 0);
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep - 1 >= 0 && nutrition[prevActiveStep - 1]) {
        return prevActiveStep - 1;
      } else {
        return Math.min(prevActiveStep + 1, maxSteps - 1);
      }
    });
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <div className="min-w-full max-w-full md:min-w-[675px] md:max-w-[800px] m-2 p-4 border rounded shadow-lg">
      <div>
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
            {nutrition.map((nutritionItem, index) => (
              <NutritionRow key={index} nutritionItem={nutritionItem} />
            ))}
          </tbody>
        </table>

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
