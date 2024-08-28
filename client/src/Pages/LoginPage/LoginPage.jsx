import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomCard from "../../Components/CustomCard/CustomCard";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { setUser } from "../store/slices/authSlice";

// LoginPage Component: Handles user login, rendering the login form and processing authentication.
//
// Key Features:
// - Provides a user-friendly form for logging in with username and password.
// - Handles authentication by sending a request to the backend.
// - Displays error messages for failed login attempts.
// - Integrates with Redux to store authenticated user data.

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useState hooks to manage form input values, loading state, and error messages.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState("");

  // handleSubmit function: Handles the form submission and login process.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); // Set loading state to true when the login process starts.
      const response = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        { username: username.toLowerCase(), password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Login successful:", data);

      // Dispatch the setUser action to store user data in Redux.
      dispatch(setUser(data));
      navigate("/home"); // Navigate to the home page upon successful login.
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        // Handle different error responses from the backend.
        if (error.response.status === 401) {
          setErrorMessage("Invalid password. Please try again.");
        } else if (error.response.status === 404) {
          setErrorMessage("User not found. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading state after the login process completes.
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        {/* Display the app logo */}
        <div className="mb-2.5 mt-2.5">
          <img className="max-w-[100px] h-auto" src="/logo.png" alt="Logo" />
        </div>
        {/* CustomCard component to encapsulate the login form */}
        <CustomCard
          title="Login"
          text="Please enter your credentials"
          color={"black"}
          wrapperClasses="bg-white"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <div className="flex justify-center items-center flex-col w-full mt-2">
              {/* Username input field */}
              <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* Password input field */}
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Display error message if login fails */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-2 w-full">
                  <span>{error}</span>
                  {/* Button to close the error message */}
                  <button
                    onClick={() => setErrorMessage("")}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414l2.934 2.934-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 101.414-1.414L11.828 10l2.934-2.934z" />
                    </svg>
                  </button>
                </div>
              )}
              {/* Submit button with loading state */}
              <button
                type="submit"
                className={`mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Loading ...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            {/* Link to the registration page for new users */}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Not registered yet?{" "}
              <span
                style={{
                  color: "#B81D33", // Your desired color
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                }}
              >
                Go to Register!
              </span>
            </Link>
          </form>
        </CustomCard>
      </div>
    </>
  );
};

export default LoginPage;
