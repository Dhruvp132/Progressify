import React, { useContext } from "react";
import taskContext from "../context/tasks/taskContext";
import ProgressBar from "@ramonak/react-progress-bar";
import "./styles.scss";


const TaskItem = (props) => {
  const context = useContext(taskContext);
  const { deleteTask } = context;
  const { task, updateTask } = props;
  return (
    <div className="cardClass">
      <div class="card my-3">
        <div style={{ height: "200px" }} class="card-body">
          <h5 class="card-title">{task.title}</h5>
          <p class="card-text">{task.description}</p>
          <ProgressBar
            completed={task.completed}
          />
          <i
            className="far fa-trash-alt mx-2"
            onClick={() => {
              deleteTask(task._id);
              alert("Deleted Successfully", "success");
            }}
          ></i>
          <i style={{"marginTop" : "25px"}}
            className="far fa-edit mx-2"
            onClick={() => {
              updateTask(task);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
