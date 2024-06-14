import { useState, SyntheticEvent, useContext } from "react";
import axios from "axios";
import { UserErrors } from "../../models/errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  // make async variable with syntetic event for consistency
  const handleSubmit = async (e: SyntheticEvent) => {
    // prevent default browser action for the event
    e.preventDefault();
    try {
      //post input data to register
      const result = await axios.post("http://localhost:3001/user/login", { username, password });
      // store token in setCookies
      setCookies("access_token", result.data.token, { sameSite: "lax" });
      // save user ID in localStorage
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err?.response?.data?.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesn't exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert(errorMessage);
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <TextField
              label="Username"
              value={username} //set value
              onChange={(e) => setUsername(e.target.value)} //receive value
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              type="password"
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
              Login
            </Button>
            <div className="register">
              <p>No Account?</p>
              <a href="/register">Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
