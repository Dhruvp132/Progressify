//very similar to middleware logic 
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { JWT_SECRET } = process.env;

exports.verifyAccessToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({  msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({  msg: "Invalid token" });
  }

  try {
    user = await User.findById(user.id);
    if (!user) {
      return res.status(401).json({  msg: "User not found" });
    }

    //LOGIC : Using req.user to store the data of the user 
    console.log("this is" + "user" + user);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({  msg: "Internal Server Error" });
  }
};
