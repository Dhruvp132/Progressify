const express = require("express");
const router = express.Router();
const { signup, login, getUser, getUsers, getTasks, updateTask, assignTaskToUser } = require("../controllers/adminControllers");
const {verifyAdmin} = require("../adminMiddleware")


// Routes starting with {host}/api/auth -> 
router.post("/signup", signup)
router.post("/login", login)
router.get("/", verifyAdmin, getUsers); //[user1.id, iser ]
router.get("/getUser", verifyAdmin, getUser); //[user1.id, iser ]
router.post("/getTasks/", verifyAdmin, getTasks)


router.post("/assignTask",verifyAdmin, assignTaskToUser)

router.put("/changeTaskOf/:taskId", verifyAdmin, updateTask)
module.exports = router;