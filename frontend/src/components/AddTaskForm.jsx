import React, { useContext, useState, useEffect } from "react";
import taskContext from "../context/tasks/taskContext";

function AddTaskForm() {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    completed: "",
  });
  const context = useContext(taskContext);
  const { addTask, getTasks } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/Progressify/");
    }
    getTasks();
    // eslint-disable-next-line
  }, [task]);
  //Define this [task] -> because this change the DOM whenever the state varible
  // changes
  // If you leave that empty that means it will only change when page is loaded

  const handleClick = (e) => {
    e.preventDefault();
    addTask(task.title, task.description, task.completed);
    setTask({ id: "", title: "", description: "", completed: "" });
    alert("Updated Successfully", "success"); // coz we want alert when we click on updatetask button
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (task.title.trim() === "" || task.description.trim() === "") {
      // Handle case where title or description is empty
      alert("Please provide both title and description");
      return;
    }

    // Call addTask function to add the new task
    addTask(task.title, task.description, task.completed);

    // Clear the form fields after submission
    setTask({
      id: "",
      title: "",
      description: "",
      completed: "",
    });
  };

  return (
    <>
      {/* FORM FOR CREATING A TASK */}
      <div className="form-container1">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <input
            className="input-field-desc"
            type="text"
            id="title"
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            type="number"
            name="completed"
            id="completed"
            placeholder="Completed (in number)"
            value={task.completed}
            onChange={handleChange}
            required
          />
          <button
            onClick={handleClick}
            type="submit"
            className="submit-btn pulse-animation"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTaskForm;
