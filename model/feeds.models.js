const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fullName: {type: String, required: true, maxlength: 20},
    userId: {type: Number, default: "", unique: true, maxlength: 4}
}, {_id: false})

const feedsSchema = new mongoose.Schema({
    title: {type: String, required: true, maxlength: 100},
    author: {type: [authorSchema]},
    body: {type: String, maxlength: 500},
    userName: {type: String, unique: true, maxlength: 12},
    tags: {type: [String]}
}, {timestamps: true})


const FeedsModel = new mongoose.model("Feeds", feedsSchema, "feed");


module.exports = FeedsModel;


