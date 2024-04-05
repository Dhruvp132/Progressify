const Task = require("../models/Task");
const { validateObjectId } = require("../utils/validation");


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks, msg: "Tasks found successfully.." });
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

    const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId });
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
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ msg: "Description of task not found" });
    }
    const task = await Task.create({ user: req.user.id, description });
    res.status(200).json({ task, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const putTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ msg: "Description of task not found" });
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

    task = await Task.findByIdAndUpdate(req.params.taskId, { description }, { new: true });
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

module.exports = {
    getTasks, getTask, postTask, deleteTask, putTask 
}