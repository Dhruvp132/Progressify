import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavDrawer,
  CloseBtn,
} from "./NavbarElements";
import { useNavigate } from "react-router";
import './Navbar.css'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ButtonText = "LogOut";
  const Navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.clear();
    Navigate("/");
  };

  const handleLogin = (e) => {};

  const handleSignin = (e) => {};

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Nav>
        <NavLink to="/"></NavLink>
        <Bars onClick={toggleDrawer} />
        <NavMenu>
          <NavLink to="/tasks" activeStyle>
            Home
          </NavLink>
          <NavLink to="/About" activeStyle>
            About
          </NavLink>
          <NavLink to="/Admin" activeStyle>
            Admin
          </NavLink>
          <NavLink to="/allTasks" activeStyle>
            Tasks
          </NavLink>
          <NavLink to="/user" activeStyle>
            Profile
          </NavLink>
        </NavMenu>
        <NavBtn>
          {!localStorage.getItem("token") ? (
            <div style={{ display: "flex" }}>
              <NavBtnLink onClick={handleLogin} to="/">
                LogIn
              </NavBtnLink>
              <NavBtnLink onClick={handleSignin} to="/">
                SignUp
              </NavBtnLink>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">
              logOut
            </button>
          )}
        </NavBtn>
      </Nav>
      <NavDrawer isOpen={isOpen}>
        <CloseBtn onClick={toggleDrawer}>&times;</CloseBtn>
        <NavLink to="/" style={{ marginTop: "10px", marginBottom: "10px" }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ marginTop: "10px", marginBottom: "10px" }}>
          About
        </NavLink>
        <NavLink to="/adminsign" style={{ marginTop: "10px", marginBottom: "10px" }}>
          Admin
        </NavLink>
        <NavLink to="/signup" style={{ marginTop: "10px", marginBottom: "10px" }}>
          Tasks
        </NavLink>
        <NavLink to="/profile" style={{ marginTop: "10px", marginBottom: "10px" }}>
          Profile
        </NavLink>
        {!localStorage.getItem("token") ? (
          <div style={{ display: "flex" }}>
            <NavBtnLink onClick={handleLogin} to="/" style={{ marginTop: "10px", marginBottom: "10px" }}>
              LogIn
            </NavBtnLink>
            <NavBtnLink onClick={handleSignin} to="/" style={{ marginTop: "10px", marginBottom: "10px" }}>
              SignUp
            </NavBtnLink>
          </div>
        ) : (
          <button onClick={handleLogout} className="btn btn-primary" style={{ marginTop: "10px", marginBottom: "10px" }}>
            logOut
          </button>
        )}
      </NavDrawer>
    </>
  );
};

export default Navbar;
