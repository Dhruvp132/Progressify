const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title : {
    type : String, 
    required : false
  },
  description: {
    type: String, 
    required: true,
  },
  completed: {
    type : Number,
    default: 0,
    required : true,
  },
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;