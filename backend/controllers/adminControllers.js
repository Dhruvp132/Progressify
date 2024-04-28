const {postTask} = require("../controllers/taskControllers")
//get all user and and their task 
const User = require("../models/User");
const Admin = require('../models/Admin')
const Task = require("../models/Task");



// (node:324) [MONGOOSE] Warning: mongoose: Cannot specify a custom index on `_id` for model name "Admin", MongoDB does not allow overwriting the default `verwriting the default `_id` index. See https://bit.ly/mongodb-id-index     
// (node:17836) [MONGOOSE] Warning: mongoose: Cannot specify a custom index on `_id` for model name "Admin", MongoDB does not allow overwriting the default `_id` index. See https://bit.ly/mongodb-id-index
// (Use `node --trace-warnings ...` to show where the warning was created)
//for authentication and encryption 
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");

//Signup and Login of User 
//Gonna be the biggest enpoint here 
const signup = async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ msg: "Please provide all required information" });
    }
    // Check if admin with given _id already exists
    const existingAdmin = await Admin.findOne({ id });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin with this ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminData = { id: id, password: hashedPassword };
    // Conditionally add email and name if provided
    //>>Note here i've been checking the condition with !== null 
    //>>bcoz if you dont enter any details those section are gonna be null
    //>>and if null then acc. to defined schema email must be unique 
    //>>so null been considered as value. so if again entered without email then 
    //>>Admin's not gonna be created.
    if (email !== null || email !== "") adminData.email = email;
    if (name !== null || name !== "" ) adminData.name = name;
    await Admin.create(adminData);
    res.status(200).json({ msg: "Congratulations!! new Admin is created " });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const login = async (req, res) => {
  try {
    const { id , password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    const admin = await Admin.findOne({ id });
    if (!admin) return res.status(400).json({ status: false, msg: "This Admin is not registered!!" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });

    const token = createAccessToken({ id: admin.id });
    delete admin.password;
    res.status(200).json({ token, admin, status: true, msg: "Admin Login success.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

//Get ALL USERS => 
const getUsers = async (req, res) => {
  try {

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
          }
        // console.log(completedPercentageArr) //correct 
        req.users = users;
        //Mark : to be converted into dict
      const usersAndTheirTaskCompleted = []
        for(let i=0; i<users.length; i++) {
          let temp = {
            "id" : users[i]._id,
            "name": users[i].name,
            "email": users[i].email,
            "taskCompleted": completedPercentageArr[i]
        };
          usersAndTheirTaskCompleted.push(temp)
        }
        res.status(200).json({ usersAndTheirTaskCompleted })
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const getUser = async (req, res) => {
  try { 
      const userId = req.header("userId");
      console.log(userId)
      const user = await User.find({_id : userId})

      const tasks = await Task.find({ user: userId });
    const total = tasks.length;
    let completedPer = 0;
    for(let i=0; i<total; i++) {
      completedPer += tasks[i].completed;
    }
    let percentage = 0;
    if(completedPer === 0) percentage = 0;
    else percentage = parseFloat(completedPer/(total * 100)) * 100;
    res.status(200).json({ user, tasks, msg: "Tasks found successfully..", percentage });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


const getTasks = async (req, res,) => {
  try {
    //mark -> write a function for that percentage calculation  and use it heretoo
    const userEmail = req.header("userEmail");
    // const userId = await User.findOne({ email: userEmail }).select('id') // or _id same -> { _id: new ObjectId('660ea0bb1afd4e14cb2eb585') }
    // const userId = await User.findOne({ email: userEmail }).select('-id')  // {id, name, joiningTime ...}
    const user = await User.findOne({email : userEmail })
    const userId = user.id
    // NOTIC the diffenece >> _id and id
    // console.log(user.id) //660ea0bb1afd4e14cb2eb585
    // console.log(user._id)  //new ObjectId('660ea0bb1afd4e14cb2eb585')

    const tasks = await Task.find({ user : userId })
    const total = tasks.length;
    let completedPer = 0;
    for(let i=0; i<total; i++) { completedPer += tasks[i].completed;}
    let percentage = 0;
    if(completedPer === 0) percentage = 0;
    else percentage = parseFloat(completedPer/(total * 100)) * 100;
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
    const userEmail = req.header("userEmail");
    const user = await User.findOne({email : userEmail })
    const userId = user.id
    console.log(userId)
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
    const task = await Task.create({ user: userId, title, description, completed });
    res.status(200).json({ task, msg: "Task assigned successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


const updateTask = (req, res) => {
  
}

module.exports = { signup, login, getUser, getUsers, getTasks, assignTaskToUser, updateTask }