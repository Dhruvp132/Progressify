/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";

function LandingUser() {
  const navigate = useNavigate();

  return (
    <div className="form-container sign-in-container">
      <form>
        <h1 style={{ color: "black", marginBottom: "20px" }}>User, ?</h1>
        <h2> Wanna Explore your task?</h2>
        <div>
          <button
            style={{ width: "200px", margin: "10px" }}
            onClick={() => navigate("/Progressify/signin")}
          >
            Let's Explore
          </button>
        </div>
      </form>
    </div>
  );
}

export default LandingUser;
