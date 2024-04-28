const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    id : {
        type : String, 
        required: [true,"Please enter cannot leave blank"],
        trim: true,
        unique : true
    },
    email: {
        type: String,
        required: [false,"Please enter cannot leave blank"],
        unique : true
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
}, {
    timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;