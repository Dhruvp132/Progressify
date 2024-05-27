/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const UserItem = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/admin/getUser", { state: { id: user.id } });
  };

  return (
    <div className="cardClass">
      <div className="card my-3">
        <div style={{ height: "200px" }} className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.email}</p>
          <ProgressBar
            completed={
              parseInt(user.taskCompleted) === 0
                ? 0
                : parseInt(user.taskCompleted)
            }
          />
          <button
            onClick={handleExplore}
            style={{ width: "125px", marginTop: "20px" }}
          >
            Explore
          </button>
          <button
            style={{ width: "150px", marginTop: "20px", marginLeft: "20px" }}
          >
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
