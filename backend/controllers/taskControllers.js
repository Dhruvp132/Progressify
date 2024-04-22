const e = require("express");
const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");

//getPercentage function => 
const getPercetage = (tasks) => {
  let total = tasks.length; 
  let completedPer = 0;
  tasks.map(function(task) {completedPer += task.completed})
  let percentage = 0;
  if(completedPer === 0) percentage = 0;
  else percentage = parseFloat(completedPer/(total * 100)) * 100;
  return percentage;
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    const total = tasks.length;
    console.log(total);
    let completedPer = 0;
    for(let i=0; i<total; i++) {
      completedPer += tasks[i].completed;
    }
    let percentage = 0;
    if(completedPer === 0) percentage = 0;
    else percentage = parseFloat(completedPer/(total * 100)) * 100;
    console.log("percentage of task completed is : " + percentage);
    res.status(200).json({ tasks, msg: "Tasks found successfully..", percentage });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const getTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user : req.user.id, _id : req.params.taskId });
    if (!task) {
      return res.status(400).json({ msg: "No task found.." });
    }
    res.status(200).json({ task, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const postTask = async (req, res) => {
  try {
    const { description, completed } = req.body;
    if (!description) {
      return res.status(400).json({ msg: "Description of task not found" });
    }
    if (!completed) {
      return res.status(400).json({ msg: "completed part of the task not found" });
    }
    const task = await Task.create({ user: req.user.id, description, completed });
    res.status(200).json({ task, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

//For updating the tasks 
const putTask = async (req, res) => {
  try {
    const { description, completed } = req.body;
    // console.log(typeof(completed) + " type with value :  " +  completed);
    if (!description) {
      return res.status(400).json({ msg: "Description of task not found" });
    }
    if (!completed) {
      return res.status(400).json({ msg: "completed part of the task not found" });
    }
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ msg: "You can't update task of another user" });
    }

    //===========================================================
    // IMPORTANT use {new : true } to get modifieded data returned 
    // By default, findByIdAndUpdate() returns the original document before any modifications 
    // were applied. However, if you specify { new: true },
    //  it will return the modified document after the update operation has been performed.

    task = await Task.findByIdAndUpdate(req.params.taskId,  { completed }, { description }, { new: true });
    res.status(200).json({ task, msg: "Task updated successfully.." });
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


const deleteTask = async (req, res) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).json({ msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(400).json({ msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(403).json({ msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { getTasks, getTask, postTask, deleteTask, putTask  }