import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import LoginSignin from "./pages/LoginSignin";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import AllTasks from "./pages/AllTasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskState from "./context/tasks/TaskState";
function App() {
  return (
    <>
      <TaskState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<LoginSignin></LoginSignin>}></Route>
            <Route exact path="/tasks" element={<Tasks></Tasks>}></Route>
            <Route exact path="/alltasks" element={<AllTasks></AllTasks>}></Route>
            <Route exact path="/user" element={<Profile></Profile>}></Route>
          </Routes>
        </Router>
      </TaskState>
    </>
  );
}

export default App;
