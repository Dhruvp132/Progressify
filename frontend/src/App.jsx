import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar/Navbar";
import AdminNav from "./components/AdminNav/Navbar";
import "./App.css";
import LoginSignin from "./pages/LoginSignin";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import AllTasks from "./pages/AllTasks";
import About from "./pages/About";
import TaskState from "./context/tasks/TaskState";
import AdminSignin from "./pages/AdminSign";
import AdminDashboard from "./pages/AdminDashboard";
import GetUser from "./pages/GetUser";
import Admin from "./pages/Admin";

const adminRoutes = [/^\/admin\/?.*$/];

function App() {
  return (
    <TaskState>
      <Router>
        <AppContent />
      </Router>
    </TaskState>
  );
}

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdmin(adminRoutes.some((route) => route.test(location.pathname)));
  }, [location]);

  return (
    <>
      {isAdmin? <AdminNav /> : <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signin" element={<LoginSignin />} />
        <Route exact path="/tasks" element={<Tasks />} />
        <Route exact path="/alltasks" element={<AllTasks />} />
        <Route exact path="/user" element={<Profile />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/admin/assignTask" element={<Admin />} />
        <Route exact path="/adminsign" element={<AdminSignin />} />
        <Route exact path="/admindashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/getuser" element={<GetUser />} />
        <Route exact path="/admin/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;