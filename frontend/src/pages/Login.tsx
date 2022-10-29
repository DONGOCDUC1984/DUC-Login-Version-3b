import React, { useState, useContext, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../UCProvider";

function Login() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, password);
  }
  var { user, login, email, setEmail, password, setPassword, loginError } =
    useContext(UserContext);
  function showHide() {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  }

  return (
    <form className="mt-5" onSubmit={handleLogin}>
      <br />
      {loginError && <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <div>
        <input
          className="mt-3"
          type={type}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FontAwesomeIcon
          onClick={showHide}
          style={{ marginLeft: "-35px" }}
          icon={icon}
        />
      </div>
      <br />
      <button className="mt-3" type="submit">
        {" "}
        <FontAwesomeIcon icon={faArrowRightToBracket} /> Log in
      </button>
      {user.email !== "" && <Navigate to="/" />}
    </form>
  );
}

export default Login;
