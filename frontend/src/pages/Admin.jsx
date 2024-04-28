import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import makeAnimated from 'react-select/animated';
import "./Admin.css";
import taskContext from '../context/tasks/taskContext';

//Hard-Coded
function Admin() {
  const [options, setOptions] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", completed: ""})
    const context = useContext(taskContext)
    const {addTask} = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
        } else {
          navigate("/");
        }
        // eslint-disable-next-line
      }, [task]);


      const handleClick = (e) => {
        e.preventDefault();
        setTask({ title: "", description: "", completed: "",})
        alert("Updated Successfully", "success"); // coz we want alert when we click on updatetask button
      };

      const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
      };
    
      // const handleSubmit = (e) => {
      //   e.preventDefault(); // Prevent default form submission behavior
      
      //   if (task.title.trim() === '' || task.description.trim() === '') {
      //     // Handle case where title or description is empty
      //     alert('Please provide both title and description');
      //     return;
      //   }
      
      //   // Call addTask function to add the new task
      //   addTask(task.title, task.description, task.completed);
      
      //   // Clear the form fields after submission
      //   setTask({
      //     id : '',
      //     title: '',
      //     description: '',
      //     completed: '',
      //   });
      // }



  const [users, setUsers] = useState([]);
  const animatedComponents = makeAnimated();

  const host = "http://localhost:5000";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${host}/api/admin/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      console.log(json);

      setUsers(json.usersAndTheirTaskCompleted); // Assuming your response has this structure
    }

    fetchData();
  }, []);


  const userOptions = users.map(user => ({
    label: user.name + " (" + user.email + ")",
    value: user.email // Or whatever unique value you want to assign
  }));

  const handleOptionChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setOptions(selectedValues)
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Handle form submission
    // Part1 => Fetch all usernames from option tag 
    for(let i = 0; i < options.length; i++) {
      // Part2 => Assign Task to user 
      const response = await fetch(`${host}/api/admin/assignTask`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token'),
          "userEmail": options[i]
        }, 
        body: JSON.stringify(task) // Sending the entire task object as JSON
      });
      const json = await response.json();
      console.log("task added", json);
    }
  };
  
  return (
    <>
    <h2 style={{margin : "50px"}}>Assign Task</h2>
    <div style={{marginTop : "50px"}}className="form-container1">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            id = "title"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange} 
            required
          />
          <input
            className="input-field-desc"
            type="text"
            id = "title"
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
          />
          {/* Bug Fix : value < 0 */}
          <input
            className="input-field"
            type="number"
            name="completed"
            id = "completed"
            placeholder="Completed (in number)"
            value={task.completed}
            onChange={handleChange}
            required
          />

          <Select options={userOptions} components={animatedComponents}
            isMulti onChange={handleOptionChange}/>

          <button onClick={handleSubmit} type="submit" className="submit-btn pulse-animation">
            Submit
          </button>
        
          <div>
            {
              options.map((option) => {
                return ( <div> {console.log(option.value)} </div>)
              })
            }
          {console.log(options)}
          </div>
        </form>
      </div>
      </>
  )
}

export default Admin