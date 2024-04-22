import React, { useContext, useEffect, useRef, useState } from "react";
import taskContext from "../context/tasks/taskContext";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";
import "./Form.css";
///api/tasks

function Tasks() {
  const navigate = useNavigate();
  const context = useContext(taskContext);
  console.log(context);
  const { tasks, addTask, deleteTask, editTask, getTasks } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/");
    }
    getTasks();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [task, setTask] = useState({
    id: "",
    etitle: "",
    edescription: "",
    ecompleted: "",
  });

  return (
    <>
      <h2 className="topHeading">Your Task</h2>
      <div className="rows">
        {tasks.length === 0 && "No tasks to display"}
        {tasks.map((task) => {
          return <TaskItem key={task._id} task={task} />;
        })}
      </div> 
    </>
  );
}

export default Tasks;
