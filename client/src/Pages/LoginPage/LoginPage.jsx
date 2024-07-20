import React, { useState } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import { Alert, Box, Button,  TextField, Typography } from "@mui/material";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import axios from "axios"; // Import axios
import { BACKEND_URL } from "../../config/config";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

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
      setLoading(true)
      const response = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        { username:username.toLowerCase(), password },
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
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <CustomCard
          title="Login"
          text="Please enter your credentials"
          color={"black"}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <div className="input-group">
              <TextField
              required
                id="username"
                label="Username"
                variant="outlined"
                value={username}
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
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
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
                 {error && (
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {error}
            </Alert>
          )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#B81D33",
                  "&:hover": {
                    backgroundColor: "#B81D33",
                  },
                }}
                endIcon={loading ? <CircularProgress sx={{color:"white"}} size={24} /> : null}
                disabled={loading}
              >
                {loading?"Loading ...":"Login"}
              </Button>
            </div>
            <Link to="/register">Not registered yet? Go to Register!</Link>
          </Box>
        </CustomCard>
      </div>
    </>
  );
};

export default LoginPage;
