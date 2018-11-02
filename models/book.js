const mongoose = require("mongoose");


let bookSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Book", bookSchema);