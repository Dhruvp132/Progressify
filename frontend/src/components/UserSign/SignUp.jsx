import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUpForm(props) {
  //Setting up the credentials / state
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //handleSubmit ->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(
      "https://progressify-1.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/Progressify/");
    } else {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    //const value = e.target.value;
    // setState({...credentials,[e.target.name]: value});
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container sign-up-container">
      {/* Here what happens when u click on submit button */}
      <form onSubmit={handleSubmit}>
        <h1 style={{ color: "black", marginBottom: "20px" }}>Create Account</h1>
        <input
          type="text"
          name="name"
          value={credentials.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
