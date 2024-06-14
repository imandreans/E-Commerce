import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { UserErrors } from "../../models/errors";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // make async variable with syntetic event for consistency
  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      // prevent default browser action for the event
      e.preventDefault();
      //post input data to register
      await axios.post("http://localhost:3001/user/register", { username, password });
      alert("Registration Completed");
    } catch (err) {
      if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXIST) {
        alert("ERROR: Username already in use");
      } else {
        alert("ERROR: Something went wrong.");
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <TextField
              type="text"
              label="Username"
              id="username"
              value={username} //set value
              onChange={(e) => setUsername(e.target.value)} //receive value
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              type="password"
              id="password"
              value={password} //set value
              onChange={(e) => setPassword(e.target.value)} //receive value
            />
          </div>
          <div className="bottom-form">
            <Button
              id="login-button"
              variant="contained"
              type="submit"
            >
              Register
            </Button>
            <div className="register">
              <p>Already have account?</p>
              <a href="/login">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
