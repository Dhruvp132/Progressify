//get all user and and their task 
const User = require("../models/User");
const Task = require("../models/Task")
const getAdmin = async (req, res) => {
  try {
    if(req.body.ADMIN_NAME === "admin" && req.body.ADMIN_PASS === "passw") {
        let users = await User.find();
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
            console.log("tasks are " + tasks);
            console.log("percentage of task completed is : " + percentage + "%");
        }
        req.users = users;
        res.status(200).json({ users })
    } else {
        res.status(200).json({ msg: "Profile found successfully.." });
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


const getTasks = async (req, res) => {
  try {
    //<Link href={'/getTasks/userId}> User 1 </Link>
    // Note i've to add logic to Frontend to send the specific user id 
    const tasks = await Task.find({ user: req.users[req.index - 1] });
    res.status(200).json({ tasks, msg: "Tasks found successfully..", percentage  });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { getAdmin, getTasks }