import React, { useState, useContext, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../UCProvider";
function Register() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  var {
    user,
    register,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    registerError,
  } = useContext(UserContext);
  function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== password2) {
      alert(
        "Password do not match.Try again.(2 mật khẩu không giống nhau.Hãy thử lại. ) "
      );
    } else {
      register(name, email, password);
    }
  }

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
    <form className="mt-5" onSubmit={handleRegister}>
      <br />
      {registerError && (
        <div>
          Email already existed.Change email. (Đã có email này rồi.Hãy thay
          email khác.)
        </div>
      )}
      <label> Tên: </label>
      <br />
      <input
        className="mt-3"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label> Email: </label>
      <br />
      <input
        className="mt-3"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label> Nhập mật khẩu: </label>
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
      <label> Nhập lại mật khẩu: </label>
      <br />
      <div>
        <input
          className="mt-3"
          type={type}
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
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
        Register
      </button>
      {user.email !== "" && <Navigate to="/" />}
    </form>
  );
}

export default Register;
