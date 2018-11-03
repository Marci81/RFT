const mongoose = require("mongoose");

let commentScheme = mongoose.Schema({
    text: String,
    author: String,
    score:Number
});


module.exports = mongoose.model("Comment", commentScheme);
