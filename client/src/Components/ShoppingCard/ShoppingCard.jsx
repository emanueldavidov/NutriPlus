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
    <Card
      sx={{
        maxWidth: 700,
        minWidth: 350,
        background: "transparent",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#B81D33" }} aria-label="shopping">
            {shoppingItem?.name?.charAt(0)}
          </Avatar>
        }
        action={
          <div className="actions">
            <IconButton sx={{ color: "#B81D33" }} aria-label="edit">
              <EditIcon onClick={handleUpdate} />
            </IconButton>

            <IconButton sx={{ color: "#B81D33" }} aria-label="delete">
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </div>
        }
        title={shoppingItem?.name}
      />

      
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Show Ingredients</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <ShoppingsList items={shoppingItem?.items} />
      </CardContent>
        </Collapse>
      {updateModal && (
        <UpdateShopping
          shopping={shoppingItem}
          openModal={updateModal}
          handleModalClose={() => {
            setUpdateModal(!updateModal);
          }}
        />
      )}
    </Card>
  );
}
