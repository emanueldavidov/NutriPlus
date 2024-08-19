import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../config/config";
import UpdateShopping from "../../Pages/Shopping/UpdateShopping";
import { fetchAllShoppingLists } from "../../Pages/store/slices/shoppingSlice";
import EditIcon from "../Buttons/EditIcon";
import TrashIcon from "../Buttons/TrashIcon";
import ShoppingsList from "../ShoppingsList/ShoppingsList";

export default function ShoppingCard({ shoppingItem }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
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
      dispatch(fetchAllShoppingLists());
      alert("Shopping List deleted successfully");
    } catch (err) {
      console.error("Error deleting shopping:", err);
    }
  };
  const handleUpdate = () => setUpdateModal(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={`${darkMode ? "bg-black " : "bg-white "
      } max-w-md min-w-[350px] border border-gray-200 rounded-lg shadow-sm`}>
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[hashtag#B81D33] text-white text-lg font-bold"
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

      <div className="flex items-center justify-center p-4 border-b border-gray-200">
        <p>Show Ingredients</p>
        <button
          className="ml-2 p-2 text-[hashtag#B81D33] hover:text-[hashtag#B81D33]"
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

      <div className={`${expanded ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 border-b border-gray-200">
          <ShoppingsList items={shoppingItem?.items} />
        </div>
      </div>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
 <div className="p-4 border-b border-gray-200">
 <ShoppingsList items={shoppingItem?.items} />
 </div>
 </Collapse> */}


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