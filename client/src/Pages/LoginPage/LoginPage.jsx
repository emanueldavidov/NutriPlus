import axios from "axios"; // Import axios
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomCard from "../../Components/CustomCard/CustomCard";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";
import { setUser } from "../store/slices/authSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
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

      dispatch(setUser(data));
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
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
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="mb-2.5 mt-2.5">
          <img className="max-w-[100px] h-auto" src="/logo.png" alt="Logo" />
        </div>
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
              <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-2 w-full">
                  <span>{error}</span>
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
