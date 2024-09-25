import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "../LoginForm/index.css";
import "./index.css";

function RegisterForm() {
  const navigate = useNavigate();
  const token = Cookies.get("jwt_token");
  useEffect(() => {
    if (token !== undefined) {
      navigate("/", { replace: true });
    }
  }, []);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const onSubmitSuccess = (jsonData) => {
    Cookies.set("jwt_token", jsonData, { expires: 30 });
    navigate("/", { replace: true });
  };
  const submitForm = async (event) => {
    event.preventDefault();
    if (username.length < 4) {
      setErrorMsg("User name should be minimum of 4 letter");
    } else if (password.length < 8) {
      setErrorMsg("Password length should be minimum of 8 characters");
    } else if (username.includes(" ")) {
      setErrorMsg("Username should not contain spaces");
    } else if (email.includes(" ")) {
      setErrorMsg("Email should not contain spaces");
    } else if (!email.includes("@gmail.com")) {
      setErrorMsg("Email input should contain @gmail.com");
    } else if (password.includes(" ")) {
      setErrorMsg("Password should not contain spaces");
    } else {
      setErrorMsg("");
      const userDetails = { username, password, email };
      const url = "https://backend-todo-app-hijr.onrender.com/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        onSubmitSuccess(data.jwtToken);
      } else {
        setErrorMsg("user already registerd try new");
      }
    }
  };
  const loginPage = () => {
    navigate("/login", { replace: true });
  };
  const toggleShowPwd = () => {
    setShowPwd(!showPwd);
  };
  return (
    <div className="common-site signin-site">
      <div className="common-container">
        <form onSubmit={submitForm} className="common-form">
          <div className="common-inputs-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div className="common-inputs-container">
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              autoComplete="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="common-inputs-container">
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <button type="button" className="eye-btn" onClick={toggleShowPwd}>
                {showPwd ? (
                  <i className="bi bi-eye-fill"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill"></i>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-btn register-submit-btn">
            Register
          </button>
        </form>
        <p className="error-msg">{errorMsg}</p>
        <button
          type="button"
          className="common-redirect-btn "
          onClick={loginPage}
        >
          Login here
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
