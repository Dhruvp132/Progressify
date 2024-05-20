import { useContext, useEffect, useState } from "react";
import taskContext from "../context/tasks/taskContext";
import "./Profile.css"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router";

function Profile() {
    const navigate = useNavigate()
  let per = 0;
  const context = useContext(taskContext);
  const [task, setTask] = useState({
    id: "",
    etitle: "",
    edescription: "",
    ecompleted: "",
  });

  const { tasks, getTasks } = context;
  const host = "http://localhost:5000";
  const [details, setDetails] = useState({
    name: "",
    email: "",
    joiningTime: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
      getTasks();
    } else {
      navigate("/");
    }
    getUser();
    getTasks();
    // eslint-disable-next-line
  }, []);

  const getUser = async (e) => {
    const response = await fetch(`${host}/api/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json.user);
    setDetails(json.user);
  };

  const getPercentage = (e) => {
    console.log("calling funcitno getEPer");
    let total = tasks.length;
    let completedPer = 0;
    for (let i = 0; i < total; i++) {
      completedPer += tasks[i].completed;
    }
    per = 0;
    if (completedPer === 0) per = 0;
    else per = parseInt(parseFloat(completedPer / (total * 100)) * 100);
    console.log("PERCENTAEG IS" + per);
  };
  getPercentage();
  return (
    <>
      <h2 style={{margin:" 15px"}}>Profile</h2>
      <div className="profileCard">
        <h2>Name : {details.name}</h2>
        <h2>Email : {details.email}</h2>
        <h2>Joining Time : {details.joiningTime}</h2>
        <h2>Number of Tasks Assigned : {tasks.length}</h2>
      </div>

        <h2 style={{margin:" 25px"}}> Work Done : {per} % </h2>
        <div style={{margin: "15px"}}>
            <ProgressBar  completed={per}/>
            <button style={{marginTop: "15px"}} onClick={()=> {navigate("/allTasks")}} >Click to see all your tasks</button>
        </div>
    </>
  );
}

export default Profile;
