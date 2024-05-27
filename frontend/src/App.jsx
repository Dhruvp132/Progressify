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

const adminRoutes = [/^\/Progressify\/admin\/?.*$/];

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
        <Route exact path="/Progressify" element={<Landing />} />
        <Route exact path="Progressify/signin" element={<LoginSignin />} />
        <Route exact path="Progressify/tasks" element={<Tasks />} />
        <Route exact path="Progressify/alltasks" element={<AllTasks />} />
        <Route exact path="Progressify/user" element={<Profile />} />
        <Route exact path="Progressify/about" element={<About />} />
        <Route exact path="Progressify/admin/assignTask" element={<Admin />} />
        <Route exact path="Progressify/adminsign" element={<AdminSignin />} />
        <Route exact path="Progressify/admindashboard" element={<AdminDashboard />} />
        <Route exact path="Progressify/admin/getuser" element={<GetUser />} />
        <Route exact path="Progressify/admin/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;