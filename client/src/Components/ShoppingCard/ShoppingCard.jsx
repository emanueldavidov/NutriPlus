import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch } from "react-redux";
import axios from "axios";
import ShoppingsList from "../ShoppingsList/ShoppingsList";
import { fetchAllShoppingLists } from "../../Pages/store/slices/shoppingSlice";
import UpdateShopping from "../../Pages/Shopping/UpdateShopping";
import { Collapse, styled, Typography } from "@mui/material";
import { BACKEND_URL } from "../../config/config";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ShoppingCard({ shoppingItem }) {
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
  <div className="max-w-md min-w-[350px] bg-transparent border border-gray-200 rounded-lg shadow-sm">
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
        <button
          className="text-[#B81D33] hover:text-[#B81D33]"
          aria-label="edit"
          onClick={handleUpdate}
        >
          <EditIcon />
        </button>
        <button
          className="text-[#B81D33] hover:text-[#B81D33]"
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>

    <div className="flex items-center justify-center p-4 border-b border-gray-200">
      <Typography>Show Ingredients</Typography>
      <button
        className="ml-2 p-2 text-[#B81D33] hover:text-[#B81D33]"
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </button>
    </div>
    
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <div className="p-4 border-b border-gray-200">
        <ShoppingsList items={shoppingItem?.items} />
      </div>
    </Collapse>

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
