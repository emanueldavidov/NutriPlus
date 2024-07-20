import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CustomRoute = ({ element }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.loggedIn;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {isAuthenticated ? (
        element
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default CustomRoute;
