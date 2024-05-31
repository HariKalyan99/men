const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    username: {type: String, unique: true, maxlength: 50, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    fullName: {type: String, default: ""}, 
})


const AuthUserModel = new mongoose.model("Authentication", authUserSchema, "auth");

module.exports = AuthUserModel;