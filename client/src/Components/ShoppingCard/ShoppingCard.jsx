// ShoppingCard Component: Displays shopping item information in a card format.
//
// Key Features:
// - Displays the name and ingredients of a shopping item.
// - Allows users to update or delete shopping items.
// - Supports dark mode styling and expandable sections to show more details.

import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/config";
import UpdateShopping from "../../Pages/Shopping/UpdateShopping";
import { fetchAllShoppingLists } from "../../Pages/store/slices/shoppingSlice";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";
import ShoppingsList from "../ShoppingsList/ShoppingsList";

// The ShoppingCard component is responsible for displaying the details of a single shopping item.
// It provides options to update or delete the item and includes an expandable section to view ingredients.

export default function ShoppingCard({ shoppingItem }) {
  // Retrieves the current dark mode setting from the Redux store.
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // useDispatch hook is used to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // useState hook manages the state of the update modal (whether it's open or closed).
  const [updateModal, setUpdateModal] = React.useState(false);

  // useState hook manages whether the ingredients section is expanded or collapsed.
  const [expanded, setExpanded] = React.useState(false);

  // handleDelete function: Deletes the current shopping item by making an API call to the backend.
  // After deletion, it dispatches an action to refresh the list of shopping items.
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/shopping/shoppingLists/${shoppingItem._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchAllShoppingLists());  // Refreshes the shopping list after deletion.
      alert("Shopping List deleted successfully");
    } catch (err) {
      console.error("Error deleting shopping:", err);
    }
  };

  // handleUpdate function: Opens the update modal to allow editing of the shopping item.
  const handleUpdate = () => setUpdateModal(true);

  // handleExpandClick function: Toggles the expanded state of the ingredients section.
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`${darkMode ? "bg-black " : "bg-white "} max-w-md min-w-[350px] border border-gray-200 rounded-lg shadow-sm`}>
      {/* Header section displaying the shopping item's name and action buttons */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#B81D33] text-white text-lg font-bold"
            aria-label="shopping"
          >
            {shoppingItem?.name?.charAt(0)}
          </div>
        </div>
        <div className="flex-grow pl-4">
          <div className="text-lg font-semibold">{shoppingItem?.name}</div>
        </div>
        <div className="flex space-x-2">
          <EditIcon onClick={handleUpdate} />
          <TrashIcon onClick={handleDelete} />
        </div>
      </div>

      {/* Expandable section toggle button */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200">
        <p>Show Ingredients</p>
        <button
          className="ml-2 p-2 text-[#B81D33] hover:text-[#B81D33]"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Ingredients list section, which expands or collapses based on the expanded state */}
      <div className={`${expanded ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200">
          <ShoppingsList items={shoppingItem?.items} />
        </div>
      </div>

      {/* UpdateShopping modal, which is conditionally rendered when updateModal is true */}
      {updateModal && (
        <UpdateShopping
          shopping={shoppingItem}
          openModal={updateModal}
          handleModalClose={() => setUpdateModal(!updateModal)}
        />
      )}
    </div>
  );
}
