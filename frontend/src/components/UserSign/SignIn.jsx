/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //handleSubmit ->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const response = await fetch(
      "https://progressify-1.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    //can also do this authentication usin json.status
    if ((json.status && json.token !== null) || json.token !== undefined) {
      localStorage.setItem("token", json.token);
      navigate("/Progressify/tasks");
    } else {
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
          type="email"
          placeholder="Email"
          name="email"
          value={credentials.email}
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

export default SignInForm;
