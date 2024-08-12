// App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import CustomDrawer from "./Components/CustomDrawer/CustomDrawer";
import NutriCalc from "./Pages/NutriCalc/NutriCalc";
import Recipe from "./Pages/Recipe/Recipe";
import Shopping from "./Pages/Shopping/Shopping";
import Meal from "./Pages/Meal/Meal";
import Footer from "./Components/Footer/Footer";
import { useSelector } from "react-redux";
import CustomRoute from "./Components/CustomRoute/CustomRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const location = useLocation();
  const noDrawer = ["/", "/register"];
  const auth = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const shouldRenderDrawer = !noDrawer.includes(location.pathname);

  console.log("Current Path:", location.pathname);
  console.log("User Logged In:", auth.loggedIn);
  console.log("Should Render Drawer:", shouldRenderDrawer);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: "#B81D33", // Default background color
            color: "white", // Default text color
            "&:hover": {
              backgroundColor: "#E04128", // Darker on hover
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root.Mui-focused": {
              color: darkMode ? "white" : "black",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#B81D33",
              },
              "&:hover fieldset": {
                borderColor: "#B81D33",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#B81D33",
              },
              "& input": {
                color: darkMode ? "white" : "black", // Text color for input in dark mode
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#B81D33",
              },
              "&:hover fieldset": {
                borderColor: "#B81D33",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#B81D33",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: darkMode ? "white" : "black",
              fontWeight: "bold",
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root.Mui-focused": {
              color: darkMode ? "white" : "black",
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#B81D33",
              },
              "&:hover fieldset": {
                borderColor: "#B81D33",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#B81D33",
              },
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="h-screen relative" >
        {shouldRenderDrawer && auth.loggedIn && (
          <CustomDrawer
            list={[
              "Share a Recipe",
              "Plan a Meal",
              "Shopping List",
              "Nutritional Calculator",
            ]}
            links={["/recipe", "/meal", "/shopping", "/nutrition"]}
          />
        )}
        <div class="flex flex-1 flex-col max-w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={<CustomRoute element={<HomePage />} />}
            />
            <Route
              path="/nutrition"
              element={<CustomRoute element={<NutriCalc />} />}
            />
            <Route
              path="/recipe"
              element={<CustomRoute element={<Recipe />} />}
            />
            <Route
              path="/shopping"
              element={<CustomRoute element={<Shopping />} />}
            />
            <Route path="/meal" element={<CustomRoute element={<Meal />} />} />
            {/* Default route for unmatched paths */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
