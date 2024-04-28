const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");
const { JWT_SECRET } = process.env;

exports.verifyAdmin = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({  msg: "Token not found" });
  let admin;
  try {
    admin = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({  msg: "Invalid token" });
  }

  try {
    admin = await Admin.findOne({id: admin.id});
    if (!admin) {
      return res.status(401).json({  msg: "Admin not found" });
    }

    //LOGIC : Using req.user to store the data of the user 
    req.admin = admin;
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({  msg: "Internal Server Error" });
  }
};
