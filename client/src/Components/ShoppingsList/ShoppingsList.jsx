import React, { useState, useEffect,useMemo } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

export default function ShoppingsList({ items }) {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [error, setErrorMessage] = useState("");


  return (
  <div>
  {/* Ingredients List */}
  {items.length > 0 && (
    <ul className="w-full list-none p-0 m-0">
      {items.map((ingredient, index) => (
        <React.Fragment key={ingredient._id}>
          <li className="flex items-start border-b border-gray-200 py-2 px-4">
            <div className="flex-1">
              <div className="font-bold">{ingredient.ingredient}</div>
              <div className="text-gray-600">
                {ingredient.quantity} {ingredient.unit}
              </div>
            </div>
            {/* Adding a margin right if needed */}
            {index < items.length - 1 && <hr className="border-gray-300 mt-2 mb-2" />}
          </li>
        </React.Fragment>
      ))}
    </ul>
  )}

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
