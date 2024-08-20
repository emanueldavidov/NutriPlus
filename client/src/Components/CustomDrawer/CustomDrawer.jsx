import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../Pages/store/slices/authSlice";
import { toggleDarkModeState } from "../../Pages/store/slices/darkMode";
import darkMenu from "../../assets/images/menu-dark.svg";
import lightMenu from "../../assets/images/menu.svg";
import moon from "../../assets/images/moon.svg";
import sun from "../../assets/images/sun.svg";

const CustomDrawer = ({ list, links }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const openDrawer = () => {
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
    <div className="w-64" role="presentation" onClick={() => toggleDrawer(false)}>
      <button className={`mt-2 ${darkMode ? "text-white" : "text-black"}`}>
        {darkMode ? (
          <img src={sun} onClick={toggleDarkMode} className="w-[25px]" />
        ) : (
          <img src={moon} onClick={toggleDarkMode} className="w-[20px]" />
        )}
      </button>
      <RouterLink to="/home">
        <div className="mt-2 w-full">
          <img className="mt-2 w-full rounded-full" src="logo2.png" alt="Avatar" />
        </div>
      </RouterLink>
      <ul className="list-none">
        {list.map((text, index) => (
          <li key={text}>
            <RouterLink
              to={links[index]}
              className={`block px-4 py-2 font-medium ${
                darkMode ? "text-white" : "text-gray-700"
              } hover:bg-gray-100 hover:text-gray-900 no-underline`}
            >
              {text}
            </RouterLink>
          </li>
        ))}
        {/* Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className={`block w-full px-4 py-2 text-left font-medium ${
              darkMode ? "text-white" : "text-gray-700"
            } hover:bg-gray-100 hover:text-gray-900`}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div>
      <div className="fixed top-0 left-0 z-50 mt-2 ml-4 cursor-pointer focus:outline-none">
        {darkMode ? (
          <img
            src={darkMenu}
            onClick={openDrawer}
            className="focus:outline-none w-[20px] mt-2 ml-4 rounded cursor-pointer"
          />
        ) : (
          <img
            src={lightMenu}
            onClick={openDrawer}
            className="focus:outline-none w-[20px] mt-2 ml-4 rounded cursor-pointer"
          />
        )}
      </div>
      <aside
        className={`fixed z-50 w-full h-screen transition-transform duration-500 ease-in-out flex inset-y-0 ${
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        role="menu"
        id="menu"
        aria-labelledby="openmenu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1} // Accessibility
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => toggleDrawer(false)} // Clicking outside will close the drawer
          aria-hidden="true"
        ></div>

        {/* Drawer Content */}
        <nav
          className={`${
            darkMode ? "bg-[#535353]" : "bg-white"
          } flex flex-col translate-x-[0%] transition-all duration-500 box-border overflow-auto w-80 p-6 shadow-xl transform ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {DrawerList}
        </nav>
      </aside>
    </div>
  );
};

export default CustomDrawer;
