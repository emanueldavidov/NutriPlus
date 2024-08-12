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
import NutritionCard from "../NutritionCard/NutritionCard";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
  const theme = useTheme();
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

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const textColor = theme.palette.mode === "dark" ? "text-white" : "text-black";

  return (
    <div
      className={`min-w-${isMobile ? "full" : "675px"} max-w-${
        isMobile ? "full" : "800px"
      } m-2 p-4 border rounded shadow-lg`}
    >
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
              <NutritionRow
                key={index}
                nutritionItem={nutritionItem}
              />
            ))}
          </tbody>
        </table>

        <div
          className={`mt-5 flex ${
            isMobile ? "flex-col" : "flex-row"
          } justify-between ${isMobile ? "items-start" : "items-center"}`}
        >
          <div
            className={`chip bg-primary px-2 py-1 rounded ${textColor} ${
              isMobile ? "my-2" : "my-0"
            }`}
          >
            Total Fats: {totals.totalFats}g
          </div>
          <div
            className={`chip bg-primary px-2 py-1 rounded ${textColor} ${
              isMobile ? "my-2" : "my-0"
            }`}
          >
            Total Protein: {totals.totalProtein}g
          </div>
          <div
            className={`chip bg-primary px-2 py-1 rounded ${textColor} ${
              isMobile ? "my-2" : "my-0"
            }`}
          >
            Total Calories: {totals.totalCalories}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionCarousel;
