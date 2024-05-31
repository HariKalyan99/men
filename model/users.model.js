const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, maxlength: 50, required: true},
    email: {type: String, unique: true, required: true},
    fullName: {type: String, default: ""},
})


const UserModel = new mongoose.model("Users", userSchema, "user");

module.exports = UserModel;