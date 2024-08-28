// NutritionsList Component: Displays a list of nutritional items in a structured format.
// 
// Key Features:
// - Renders multiple NutritionCard components in a list or grid.
// - Supports sorting and filtering based on nutritional criteria.
// - Styled for readability and accessibility.

import React from "react";

function NutritionList({ item }) {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="p-4">
        <div className="text-gray-900 text-lg font-semibold">Fats</div>
        <div className="text-gray-600 text-base">
          <span className="text-black">{item.fat}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-gray-900 text-lg font-semibold">Protein</div>
        <div className="text-gray-600 text-base">
          <span className="text-black">{item.protein}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-gray-900 text-lg font-semibold">Calories</div>
        <div className="text-gray-600 text-base">
          <span className="text-black">{item.calories}</span>
        </div>
      </div>
    </div>
  );
}

export default NutritionList;
