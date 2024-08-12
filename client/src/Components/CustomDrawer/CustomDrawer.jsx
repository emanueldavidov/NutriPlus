import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button, IconButton, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkModeState } from "../../Pages/store/slices/darkMode";
import { logout } from "../../Pages/store/slices/authSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const CustomDrawer = ({ list, links }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const toggleDrawer = (newOpen)=>()  => {
    setOpen(newOpen);
  };
  const openDrawer = ()  => {
    setOpen(true);
  };
  const toggleDarkMode = () => {
    dispatch(toggleDarkModeState());
  };
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    setOpen(false); // Close the drawer after logout
    if (darkMode) dispatch(toggleDarkModeState());
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Button sx={{ marginTop: "10px", color: !darkMode ? "black" : "white" }}>
        {darkMode ? (
          <IconButton onClick={toggleDarkMode}>
            <LightModeIcon />{" "}  
          </IconButton>
        ) : (
          <IconButton onClick={toggleDarkMode}>
            <DarkModeIcon />{" "}
          </IconButton>
        )}
      </Button>
      <MuiLink
        component={RouterLink}
        to="/home"
        underline="none"
        sx={{ color: darkMode ? "black" : "white" }}
      >
        <Avatar
          sx={{ marginTop: "10px", width: "100%", height: "50%" }}
          src="logo2.png"
        />
      </MuiLink>
      <List>
        {list.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={links[index]}
              underline="none"
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Logout Button */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
return (
  <div>
    {!darkMode && (
      <button
      className="p-2 rounded focus:outline-none"
      onClick={openDrawer}
      >
        <MenuIcon className="fixed top-4 left-4 z-50" onClick={openDrawer} style={{ color: "black" }} />
      </button>
    )}
    {darkMode && (
      <button
        onClick={openDrawer}
        className="p-2 rounded focus:outline-none"
      >
        <MenuIcon className="fixed top-4 left-4 z-50"  onClick={openDrawer} style={{ color: "white" }} />
      </button>
    )}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
  </div>
);
};
export default CustomDrawer;
