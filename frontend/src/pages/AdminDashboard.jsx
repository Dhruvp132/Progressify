import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import makeAnimated from "react-select/animated";
import "./Admin.css";
import UserItem from "../components/UserItem";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const animatedComponents = makeAnimated();

  const host = "https://progressify-1.onrender.com";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${host}/api/admin/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log(json);

      setUsers(json.usersAndTheirTaskCompleted); // Assuming your response has this structure
    }

    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ margin: "30px" }}> Users Profile </h2>

      <div className="rows">
        {users.length === 0 && "No tasks to display"}
        {users.map((user) => {
          return (
            <UserItem key={user.id} user={user}>
              {user.name}
            </UserItem>
          );
        })}
      </div>
    </>
  );
}

export default AdminDashboard;
