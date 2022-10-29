import React, { memo, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../style/NavBar.css";
import { UserContext } from "../UCProvider";

function NavBar() {
  var { user, handleLogout } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-sm bg-dark fixed-top">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item me-3">
            <NavLink to="/" className="nav-link text-white">
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
          </li>
          {user.email !== "" ? (
            <>
              <li className="nav-item me-3">
                <div
                  style={{ cursor: "pointer" }}
                  className="text-white mt-2"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out
                </div>
              </li>

              <li className="nav-item">
                <NavLink to="/aboutuser" className="nav-link text-white">
                  <FontAwesomeIcon icon={faUser} /> About User
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-3">
                <NavLink to="/login" className="nav-link text-white">
                  Login
                </NavLink>
              </li>

              <li className="nav-item me-3">
                <NavLink to="/register" className="nav-link text-white">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default memo(NavBar);
