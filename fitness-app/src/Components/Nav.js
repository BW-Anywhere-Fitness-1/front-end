import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocalStorage } from "./../hooks";

export default function Nav() {
  const [user, setUser] = useLocalStorage("user", "");
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    setUser(null);
    history.push("/login");
  };

  return (
    <div>
      {user && user.access_token && (
        <nav className="nav">
          <div className="container">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {/* <Link to="/login" className="nav-link">
              For Clients
            </Link>
            <Link to="/instructorLogin" className="nav-link">
              For Instructors
            </Link> */}
            <Link to="/classes" className="nav-link">
              Classes
            </Link>
            <Link to="/logout" onClick={logout} className="nav-link">
              Logout
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
