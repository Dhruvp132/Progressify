const express = require("express");
const router = express.Router();
const { getAdmin, getTasks } = require("../controllers/adminControllers");

// Routes starting with /{api}/auth
//Hard coded for instance 
router.get("/", getAdmin); //[iser1.id, iser ]
router.get("/getTasks/:id", getTasks)
module.exports = router;