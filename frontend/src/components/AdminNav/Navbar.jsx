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

  // const toggleDrawer = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      <Nav>
        <NavLink to="/"></NavLink>
        {/* <Bars onClick={toggleDrawer} /> */}
        <Bars  />
        <NavMenu>
          <NavLink to="/adminDashboard" activeStyle>
            Dashboard
          </NavLink>
          <NavLink to="/admin/getuser" activeStyle>
            Users
          </NavLink>
          <NavLink to="/admin/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/admin/assignTask" activeStyle>
            AsignTask
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
      {/* <NavDrawer isOpen={isOpen}>
        <CloseBtn onClick={toggleDrawer}>&times;</CloseBtn>
        <NavLink to="/adminDashboard">Dashboard</NavLink>
        <NavLink to="/admin/getuser">Users</NavLink>
        <NavLink to="/admin/about">About</NavLink>
        <NavLink to="/admin/assignTask">Assign Task</NavLink>
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
      </NavDrawer> */}
    </>
  );
};

export default Navbar;
