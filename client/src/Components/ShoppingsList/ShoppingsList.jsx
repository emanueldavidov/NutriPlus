// ShoppingsList Component: Displays a list of shopping items in a structured format.
//
// Key Features:
// - Renders a list of ingredients with their quantities and units.
// - Provides a clear and simple interface for viewing shopping list items.
// - Includes error handling with a dismissible error message display.

import React, { useState } from "react";

// The ShoppingsList component is responsible for displaying a list of shopping items (ingredients) 
// in a structured and easy-to-read format. It also handles any potential errors that may occur.

export default function ShoppingsList({ items }) {
  // useState hook to manage error messages, which can be displayed and dismissed by the user.
  const [error, setErrorMessage] = useState("");

  return (
    <div>
      {/* Conditional rendering of the ingredients list if there are items */}
      {items.length > 0 && (
        <ul className="w-full list-none p-0 m-0">
          {items.map((ingredient, index) => (
            <React.Fragment key={ingredient._id}>
              <li className="flex items-start border-b border-gray-200 py-2 px-4">
                {/* Display the ingredient name in bold and its quantity with unit */}
                <div className="flex-1">
                  <div className="font-bold">{ingredient.ingredient}</div>
                  <div>
                    {ingredient.quantity} {ingredient.unit}
                  </div>
                </div>
                {/* Optional horizontal line to separate items visually, 
                    but only if the current item is not the last one in the list */}
                {index < items.length - 1 && (
                  <hr className="border-gray-300 mt-2 mb-2" />
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}

      {/* Conditional rendering of an error message, which includes a close button */}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded flex items-center">
          <span className="flex-1">{error}</span>
          <button
            className="ml-2 text-red-600 hover:text-red-800"
            onClick={() => setErrorMessage("")}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
