const express = require("express");
const router = express.Router();
const { getAdmin, getTasks, assignTaskToUser } = require("../controllers/adminControllers");

// Routes starting with /{api}/auth
//Hard coded for instance 
router.post("/", getAdmin); //[iser1.id, iser ]
router.get("/getTasksOf/:userId", getTasks)
router.post("/:userId/", assignTaskToUser)
module.exports = router;