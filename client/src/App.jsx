// App Component: Main application component handling the routing and layout of the app.
// Key Aspects:
// - Handles the overall structure of the application.
// - Uses React Router for managing navigation between pages.
// - Wraps the app in necessary providers, such as Redux and Theme providers.

// Function and Block Explanations:
// - useEffect: Initializes and sets up any necessary configurations on component mount.
// - Routes: Defines the main routes and components associated with each path.


// App.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import CustomDrawer from "./Components/CustomDrawer/CustomDrawer";
import CustomRoute from "./Components/CustomRoute/CustomRoute";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Meal from "./Pages/Meal/Meal";
import NutriCalc from "./Pages/NutriCalc/NutriCalc";
import Recipe from "./Pages/Recipe/Recipe";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Shopping from "./Pages/Shopping/Shopping";

function App() {
  const location = useLocation();
  const noDrawer = ["/", "/register"];
  const auth = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const shouldRenderDrawer = !noDrawer.includes(location.pathname);

  return (
    <main className="min-h-screen flex flex-col">
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
      <div class="flex-grow ">
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
    </main>
  );
}

export default App;
