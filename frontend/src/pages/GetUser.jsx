import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import "./Profile.css";
function GetUser() {
  const location = useLocation();
  const id = location.state ? location.state.id : null;

  const [user, setUser] = useState(null); // Define useState outside useEffect
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const host = "https://progressify-1.onrender.com";

    async function fetchData() {
      try {
        const response = await fetch(`${host}/api/admin/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
            userId: id,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setUser(json.user);
        setTasks(json.tasks);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (id) {
      // Fetch only if id is present
      fetchData();
    }
  }, [id]); // Include id in the dependency array

  //Q. Why do so in above
  //  The id obtained from the useLocation hook could be considered a
  // synchronous in nature because it depends on the location state,
  //  which might not be immediately available when the component
  // mounts.

  //Note why if (id) ?
  //AnsDependency Array in useEffect: You've passed an empty dependency array ([]) to useEffect, which means it will only run once when the component mounts. If you want it to run when id changes, you should include id in the dependency array.
  // Brief =>

  return (
    <>
      <div className="profileCard">
        {/* Render user data */}
        {user && (
          <div>
            <p>User Name: {user[0].name}</p>
            <p> Email: {user[0].email}</p>
            <p> Joining Time: {user[0].joiningTime}</p>
          </div>
        )}
      </div>

      <h2 style={{ marginLeft: "100px", margin: "20px" }}>
        {" "}
        Tasks of this User{" "}
      </h2>
      <div className="rows">
        {tasks.length === 0 && "No tasks to display"}
        {tasks.map((task) => {
          return <TaskItem key={task._id} task={task} />;
        })}
      </div>
    </>
  );
}

export default GetUser;
