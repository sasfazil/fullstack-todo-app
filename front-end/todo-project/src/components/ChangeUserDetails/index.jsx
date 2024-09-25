import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "../LoginForm/index.css";
import "./index.css";

function ChangeUserDetails() {
  const navigate = useNavigate();
  const token = Cookies.get("jwt_token");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  useEffect(() => {
    if (token === undefined) {
      navigate("/login", { replace: true });
    } else {
      const callApi = async () => {
        try {
          const apiUrl = "https://backend-todo-app-hijr.onrender.com";
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          };
          const response = await fetch(apiUrl, options);
          const data = await response.json();
          setUserName(data[0].username);
          setEmail(data[0].email);
        } catch (err) {
          alert("Server Error");
          Cookies.remove("jwt_token");
          navigate("/login", { replace: true });
        }
      };
      callApi();
    }
  }, []);

  const onSubmitSuccess = (jsonData) => {
    Cookies.set("jwt_token", jsonData, { expires: 30 });
    navigate("/", { replace: true });
    alert("User Details Changed");
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
      const userDetails = { newUsername: username, password, email };
      const url = "https://backend-todo-app-hijr.onrender.com/updateuser";
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
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
  const backHome = () => {
    navigate("/", { replace: true });
  };
  const toggleShowPwd = () => {
    setShowPwd(!showPwd);
  };
  return (
    <div className="common-site signin-site">
      <div className="common-container">
        <form onSubmit={submitForm} className="common-form">
          <div className="common-inputs-container">
            <label htmlFor="username">Change Username:</label>
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
            <label htmlFor="username">Change Email:</label>
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
            <label htmlFor="password">Change Password:</label>
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
            Save Changes
          </button>
        </form>
        <p className="error-msg">{errorMsg}</p>
        <button
          type="button"
          className="common-redirect-btn "
          onClick={backHome}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}

export default ChangeUserDetails;
