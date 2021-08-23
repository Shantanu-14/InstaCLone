import React, { useState, useContext } from "react";
import { NavLink , useHistory} from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";
import { UserContext } from "../../App";
import M from "materialize-css"
import "./NavBar.css";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li className="nav-items">
          <NavLink
            to="/Home"
            className="nav-links"
            activeClassName="active"
            onClick={handleClick}
          >
            home
          </NavLink>
        </li>,
        <li className="nav-items">
          <NavLink
            to="/create"
            className="nav-links"
            activeClassName="active"
            onClick={handleClick}
          >
            Create Post
          </NavLink>
        </li>,
        <li className="nav-items">
          <NavLink
            to="/myfollowerspost"
            className="nav-links"
            activeClassName="active"
            onClick={handleClick}
          >
            Followers Post
          </NavLink>
        </li>,
        <li className="nav-items">
          <NavLink
            to="/Profile"
            className="nav-links"
            activeClassName="active"
            onClick={handleClick}
          >
            Profile
          </NavLink>
        </li>,
        <li className="nav-items">
          <button
            style={{borderRadius:"10px"}}
            className="btn waves-effect waves-light #e53935 red darken-1"
            onClick={() => {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push("/signin")
              M.toast({html:"Logged Out",classes: "#e53935 red darken-1"})
            }}
          >
            Log Out
          </button>
        </li>,
      ];
    } else {
      return [
        <li className="nav-items">
          <NavLink
            to="/Signin"
            className="nav-links"
            activeClassName="active"
            onClick={handleClick}
          >
            Sign in
          </NavLink>
        </li>,
        <li className="nav-items">
          <NavLink
            to="/Signup"
            className="nav-links"
            activeClassName="active"
            onClick={handleClick}
          >
            Sign up
          </NavLink>
        </li>,
      ];
    }
  };

  const handleClick = () => setClick(!click);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to={state ? "/" : "/signin"} className="nav-logo">
          Instagram
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {renderList()}
        </ul>

        <div className="nav-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
