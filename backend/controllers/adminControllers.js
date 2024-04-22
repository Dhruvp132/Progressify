const {postTask} = require("../controllers/taskControllers")
//get all user and and their task 
const User = require("../models/User");
const Task = require("../models/Task");

const getAdmin = async (req, res) => {
  try {
    if(req.body.ADMIN_NAME === "admin" && req.body.ADMIN_PASS === "passw") {
        let users = await User.find();
        const completedPercentageArr = []
        for(let i=0; i<users.length;i++){
            // console.log("username : " + users[i].name + " with this email : " + users[i].email + " has done this percentage of task" )
            const tasks = await Task.find({ user: users[i]});
            const total = tasks.length;
            let completedPer = 0;
            for(let j=0; j<total; j++) {
              completedPer += tasks[j].completed;
            }
            let percentage = 0;
            if(completedPer === 0) percentage = 0;
            else percentage = parseFloat(completedPer/(total * 100)) * 100;
            completedPercentageArr.push(percentage);
            // console.log("tasks are " + tasks);
            // console.log("percentage of task completed is : " + percentage + "%");
          }
        // console.log(completedPercentageArr) //correct 
        req.users = users;
        console.log(users)
        //Mark : to be converted into dict
      const usersAndTheirTaskCompleted = []
        for(let i=0; i<users.length; i++) {
          let temp = {
            "name": users[i].name,
            "email": users[i].email,
            "taskCompleted": completedPercentageArr[i]
        };
          usersAndTheirTaskCompleted.push(temp)
        }
        res.status(200).json({ usersAndTheirTaskCompleted })
    } else {
        res.status(200).json({ msg: "Admin not found.." });
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


const getTasks = async (req, res) => {
  try {
    //<Link href={'/getTasksOf/:userId}> User 1 </Link>
    // Note i've to add logic to Frontend to send the specific user id 
    // const tasks = await Task.find({ user: req.users[req.index - 1] });
    //mark -> write a function for that percentage calculation  and use it heretoo
    console.log(req.params.userId)
    const userId = req.params.userId;
    const tasks = await Task.find({ user : userId })
    const total = tasks.length;
    let completedPer = 0;
    for(let i=0; i<total; i++) {
      console.log(tasks[i].completed);
      completedPer += tasks[i].completed;
    }
    let percentage = 0;
    if(completedPer === 0) percentage = 0;
    else percentage = parseFloat(completedPer/(total * 100)) * 100;
    const user = await User.findById(userId)
    console.log(user.name)
    res.status(200).json({"userName" : user.name, "progress" :  percentage,  msg: "Tasks of the user are : ", tasks });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const assignTaskToUser = async (req, res) => {
  try {
    //Part1 - Get the user ->
    const userId = req.params.userId;
    //Part2 - Where user sends the data to a particular User
    // Admin assign task to user -> 
    const {title, description , completed } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "Title of task not found" });
    }
    if (!description) {
      return res.status(400).json({ msg: "Description of task not found" });
    }
    if (!completed) {
      return res.status(400).json({ msg: "completed part of the task not found" });
    }
    const task = await Task.create({ user: userId, description, completed });
    res.status(200).json({ task, msg: "Task assigned successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { getAdmin, getTasks, assignTaskToUser }