import React, { useState } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import { Alert, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigation } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = [];

    if (!validateEmail(email)) {
      newErrors.push("Invalid email format");
    }

    if (
      password !== passwordConfirm ||
      password === "" ||
      passwordConfirm === ""
    ) {
      newErrors.push("Passwords do not match");
    }

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
        // Registration successful
        setTimeout(() => {

          window.location.href = "/login"; // Navigate to login page
        }, 1000)
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
        <form className="flex flex-col items-center" noValidate autoComplete="off">
          <div className="flex justify-center items-center flex-col w-full">
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              required
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
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
              }}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              required
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
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
              }}
            />
            <TextField
              id="passwordConfirm"
              type="password"
              label="Repeat Password"
              variant="outlined"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
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
              }}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              sx={{
                marginBottom: "10px",
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "black",
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
              }}
            />
            {errors.length > 0 &&
              errors.map((error, index) => (
                <Alert
                  key={index}
                  severity="error"
                  onClose={() => {
                    let newErrors = [...errors];
                    newErrors.splice(index, 1);
                    setErrors(newErrors);
                  }}
                >
                  {error}
                </Alert>
              ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleRegister}
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                backgroundColor: "#B81D33",
                "&:hover": {
                  backgroundColor: "#B81D33",
                },
              }}
              disabled={loading}
              endIcon={
                loading ? (
                  <CircularProgress sx={{ color: "white" }} size={24} />
                ) : null
              }
            >
              {loading ? "Loading..." : "Register"}
            </Button>

            {success && (
              <Alert severity={"success"}>Registered Successfully. Redirecting to login page...</Alert>
            )}
          </div>
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
