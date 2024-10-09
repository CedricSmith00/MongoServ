const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    autthor: {
        type:String,
        require:true
    },
    genre: {
        type: String,
        require:true
    }
});

const Book =mongoose.model("book", bookSchema);
module.exports = Book;