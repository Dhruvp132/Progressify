import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LandingAdmin(props) {
  const navigate = useNavigate();

  return (
    <div className="form-container sign-up-container">
      {/* Here what happens when u click on submit button */}
      <form>
        <h1 style={{ color: "black", marginBottom: "20px" }}>Admin, ?</h1>
        <h2>Yes, Wanna see assigned tasks!</h2>
        <div>
          <button
            style={{ width: "200px", margin: "10px" }}
            onClick={() => navigate("/Progressify/adminsign")}
          >
            Yeah sure
          </button>
        </div>
      </form>
    </div>
  );
}

export default LandingAdmin;
