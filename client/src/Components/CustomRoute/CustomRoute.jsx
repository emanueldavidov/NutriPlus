// CustomRoute Component: Wrapper component for routes that includes custom logic, such as authentication checks.
// 
// Key Features:
// - Wraps around React Router routes to add custom behavior.
// - Can enforce authentication or role-based access control.
// - Integrates with Redux or other state management for dynamic routing.

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CustomRoute = ({ element }) => {
  // Access the authentication state from Redux store
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.loggedIn; // Determine if the user is authenticated

  // Redirect to the home page if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirects to the root path if not logged in
  }

  // If the user is authenticated, render the specified element (page/component)
  return (
    <div>
      {isAuthenticated ? (
        element // Render the provided element if the user is authenticated
      ) : (
        <Navigate to="/" /> // This fallback is redundant but ensures security
      )}
    </div>
  );
};

export default CustomRoute;
