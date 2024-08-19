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
