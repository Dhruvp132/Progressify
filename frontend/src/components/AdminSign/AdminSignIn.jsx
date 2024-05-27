import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminSignIn(props) {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  //Clear Local Storage Bcoz Of the userLocalStorage token key
  useEffect(() => {
    localStorage.clear();
  }, []);

  //handleSubmit ->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, password } = credentials; // Changed id to email here
    const response = await fetch(
      "https://progressify-1.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      }
    );
    const json = await response.json();
    console.log(json);
    if ((json.status && json.token !== null) || json.token !== undefined) {
      localStorage.setItem("token", json.token);
      navigate("/Progressify/admindashboard");
    } else {
      alert("Please enter correct Details");
      console.log("Error 400");
    }
  };

  const handleChange = (e) => {
    //const value = e.target.value;
    // setState({...credentials,[e.target.name]: value});
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: "black", marginBottom: "20px" }}>Sign in</h1>
        <input
          type="text"
          placeholder="Admin Id"
          name="id"
          value={credentials.id}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default AdminSignIn;
