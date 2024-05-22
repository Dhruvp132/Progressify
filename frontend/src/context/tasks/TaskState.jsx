import react from "react";
import TaskContext from "./taskContext";
import { useState } from "react";

const TaskState = (props) => {
  console.log("getting here");
  const host = "https://progressify-1.onrender.com";
  const tasksInitial = [
    { _id: "", user: "", description: "", createdAt: "", completed: 0 },
  ];

  const [tasks, setTasks] = useState(tasksInitial);

  //Get all tasks
  const getTasks = async () => {
    console.log("hitting get endpoint");
    const response = await fetch(`${host}/api/tasks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setTasks(json.tasks);
  };

  //Add a task
  const addTask = async (title, description, completed) => {
    const response = await fetch(`${host}/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, completed }),
    });
    const task = await response.json();
    setTasks(tasks.concat(task));
  };

  //Delete a task
  const deleteTask = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleted the task with this id" + id);
    const newTasks = tasks.filter((task) => {
      return task._id !== id;
    });
    setTasks(newTasks);
  };

  //Edit a task
  const editTask = async (id, title, description, completed) => {
    //API call
    const response = await fetch(`${host}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      //Here we're dealing with the updatation in the client side
      body: JSON.stringify({ title, description, completed }),
    });
    const json = response.json();
    //this will create a deep copy of the tasks array
    const newTasks = JSON.parse(json.stringify(tasks));
    console.log(newTasks);
    // Logic for editing tasks in client side
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === id) {
        newTasks[index].title = title;
        newTasks[index].description = description;
        newTasks[index].completed = completed;
        break;
      }
    }
    newTasks;
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, editTask, getTasks }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
