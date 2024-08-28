import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomCard from "../../Components/CustomCard/CustomCard";
import TextField from "../../Components/TextField";
import { BACKEND_URL } from "../../config/config";

// RegisterPage Component: Handles user registration, rendering the registration form and processing user data.
//
// Key Aspects:
// - Includes form validation and error handling.
// - Interacts with backend services to register new users.

const RegisterPage = () => {
  // State management for form inputs, errors, loading status, and success status.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Email validation function using a regular expression.
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handles the form submission for user registration.
  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = [];

    // Validate email format.
    if (!validateEmail(email)) {
      newErrors.push("Invalid email format");
    }

    // Check if passwords match and are not empty.
    if (
      password !== passwordConfirm ||
      password === "" ||
      passwordConfirm === ""
    ) {
      newErrors.push("Passwords do not match");
    }

    // If there are any validation errors, update the state and return.
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/user/register`, {
        username: username.toLowerCase(),
        password,
        email,
      });

      if (response.status === 201) {
        setSuccess(true);
        // Redirect to login page after successful registration.
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 409) {
          newErrors.push("User already registered");
        } else {
          newErrors.push("Registration failed");
        }
      } else {
        newErrors.push("Something went wrong");
      }
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page flex justify-center items-center flex-col">
      <div className="mb-2.5 mt-2.5">
        <img className="max-w-[100px] h-auto" src="/logo.png" alt="Logo" />
      </div>

      <CustomCard
        title="Register"
        text="Enter your information to register"
        color={"black"}
        wrapperClasses="bg-white"
      >
        <form
          className="flex flex-col items-center"
          noValidate
          autoComplete="off"
        >
          <div className="flex justify-center items-center flex-col w-full">
            {/* Username input field */}
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password input field */}
            <TextField
              id="password"
              type="password"
              label="Password"
              required
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Password confirmation input field */}
            <TextField
              id="passwordConfirm"
              type="password"
              label="Repeat Password"
              variant="outlined"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            {/* Email input field */}
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Display validation errors */}
            {errors.length > 0 &&
              errors.map((error, index) => (
                <div
                  key={index}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-2 w-full"
                >
                  <span className="block sm:inline">{error}</span>
                  <button
                    onClick={() => {
                      let newErrors = [...errors];
                      newErrors.splice(index, 1);
                      setErrors(newErrors);
                    }}
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
              ))}

            {/* Register button with loading state */}
            <button
              type="submit"
              onClick={handleRegister}
              className={`mt-2 mb-2 bg-[#B81D33] hover:bg-[#B81D33] text-white py-2 px-4 rounded flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
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
              ) : (
                "Register"
              )}
            </button>

            {/* Success message after successful registration */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <span>
                  Registered Successfully. Redirecting to login page...
                </span>
              </div>
            )}
          </div>

          {/* Link to the login page for users who are already registered */}
          <Link to="/" style={{ textDecoration: "none" }}>
            Already registered?{" "}
            <span
              style={{
                color: "#B81D33",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none";
              }}
            >
              Go to Login!
            </span>
          </Link>
        </form>
      </CustomCard>
    </div>
  );
};

export default RegisterPage;
