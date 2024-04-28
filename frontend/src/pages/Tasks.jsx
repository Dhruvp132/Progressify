import React, { useContext, useEffect, useRef, useState } from "react";
import taskContext from "../context/tasks/taskContext";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";
import AddTaskForm from "../components/AddTaskForm";
import "./Form.css";

///api/tasks
function Tasks() {
  const navigate = useNavigate();
  const context = useContext(taskContext);
  console.log(context);
  const { tasks, deleteTask, editTask, getTasks } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [task, setTask] = useState({
    id: "",
    etitle: "",
    edescription: "",
    ecompleted: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTasks();
    } else {
      navigate("/");
    }
    getTasks();
    // eslint-disable-next-line
  }, [task]);
  //Define this [task] -> because this change the DOM whenever the state varible
  // changes
  // If you leave that empty that means it will only change when page is loaded

  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({
      id: currentTask._id,
      etitle: currentTask.title,
      edescription: currentTask.description,
      ecompleted: currentTask.completed,
    });
  };

  //Edit Task =>
  const handleClickEdit = (e) => {
    editTask(task.id, task.etitle, task.edescription, task.ecompleted); // Edit the task
  const updatedTasks = tasks.map((t) => (t._id === task.id ? { ...t, title: task.etitle, description: task.edescription, completed: task.ecompleted } : t)); // Update the task in the local state
  setTask(updatedTasks); // Update the local state with the new tasks
  refClose.current.click();
  alert("Updated Successfully", "success"); // coz we want alert when we click on updatetask button
  };

  const onChangeEdit = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 className="topHeading">Create a new Task</h2>
      <AddTaskForm></AddTaskForm>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={task.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChangeEdit}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={task.edescription}
                    onChange={onChangeEdit}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Completed
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ecompleted"
                    name="ecompleted"
                    value={task.ecompleted}
                    onChange={onChangeEdit}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClickEdit}
                type="button"
                className="btn btn-primary"
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="topHeading">Your Task</h2>
      <div className="rows">
        {tasks.length === 0 && "No tasks to display"}
        {tasks.map((task) => {
          return (
            <TaskItem key={task._id} task={task} updateTask={updateTask} />
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
