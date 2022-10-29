import React, { useContext } from "react";
import { UserContext } from "../UCProvider";

function Header() {
  var { user } = useContext(UserContext);
  return (
    <div>
      {user.email !== "" ? (
        <div>
          <p> Logged in/Registered by {user.email} </p>
        </div>
      ) : (
        <div>
          <p>Not logged in/registered yet </p>
        </div>
      )}
    </div>
  );
}

export default Header;
