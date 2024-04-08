const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    //== MUST USE AWAIT below here =====>>>> becuse its returning a promise
    await User.deleteOne({ _id: req.user.id })
    res.status(200).json({  msg: "Profile found successfully.. and deleted successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = { getUser, deleteUser }