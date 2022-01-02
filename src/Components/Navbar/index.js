import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

import "./index.css";
const Navbar = () => {

  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  const logout = () => {
    localStorage.clear();
    setToken(null);
  }
  return (
    <React.Fragment>
      <div className="navbar top-navbar">
        <div className="logo-sec">
          <h5>Where Singles Mingle</h5>
        </div>
        <div className="menu-sec">
          <ul className="nav">
            {!token ?
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Sign In
                  </NavLink>
                </li>
              </Fragment>
              :
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    About Me
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-matches">
                    My Matches
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/update-profile">
                    Update Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink onClick={logout} className="nav-link" to="/">
                    Logout
                  </NavLink>
                </li>
              </Fragment>
            }
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
