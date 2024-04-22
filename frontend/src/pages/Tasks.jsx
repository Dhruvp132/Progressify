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

  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({
      id: currentTask._id,
      etitle: currentTask.title,
      edescription: currentTask.description,
      ecompleted: currentTask.completed,
    });
  };

  const handleClick = (e) => {
    editTask(task.id, task.etitle, task.edescription, task.ecompleted);
    refClose.current.click();
    alert("Updated Successfully", "success"); // coz we want alert when we click on updatetask button
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {};

  return (
    <>
      <h2 className="topHeading">Create a new Task</h2>

      {/* FORM FOR CREATING A TASK */}
      <div className="form-container1">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            name="title"
            placeholder="Title"
            value={task.etitle}
            onChange={handleChange}
          />
          <input
            className="input-field-desc"
            type="text"
            name="description"
            placeholder="Description"
            value={task.edescription}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="number"
            name="completed"
            placeholder="Completed (in number)"
            value={task.ecompleted}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn pulse-animation">
            Submit
          </button>
        </form>
      </div>

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
