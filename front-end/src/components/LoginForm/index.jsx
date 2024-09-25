import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const cookiesJwt = Cookies.get("jwt_token");

  useEffect(() => {
    if (cookiesJwt !== undefined) {
      navigate("/", { replace: true });
    }
  }, []);

  const onSubmitSuccess = (jsonData) => {
    Cookies.set("jwt_token", jsonData, { expires: 30 });
    navigate("/", { replace: true });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = "https://backend-todo-app-hijr.onrender.com/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      setErrorMsg("");
      const data = await response.json();
      onSubmitSuccess(data.jwtToken);
    } else {
      setErrorMsg("username or password is incorrect");
    }
  };

  const registerPage = () => {
    navigate("/register", { replace: true });
  };

  const toggleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  return (
    <div className="common-site">
      <div className="common-container">
        <form onSubmit={submitForm} className="common-form">
          <div className="common-inputs-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(event) => setUserName(event.target.value)}
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
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <p className="error-msg">{errorMsg}</p>
        <button
          type="button"
          className="common-redirect-btn"
          onClick={registerPage}
        >
          Register here
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
