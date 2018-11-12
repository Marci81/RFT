const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const clean = require("./cleanDB");
//
// clean();

//Models
const Book = require("./models/book");
const Comment = require("./models/comment");


mongoose.connect("mongodb://localhost/bookReviewRft", {useNewUrlParser: true});


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


//Create New Book Just Uncomment The Following Code
// Book.create({
//     title: "Harry Potter",
//     image: "https://images.unsplash.com/photo-1530027801118-fee21a67b3af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e271bf72dbc65bf5970a850e314d5ce&auto=format&fit=crop&w=750&q=80",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae varius ipsum, non ullamcorper ex. Morbi aliquam consectetur ligula, nec fringilla metus tempus vitae. Nulla facilisi. Etiam quis convallis tortor. Integer auctor efficitur dapibus."
// }, function (err, book) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("New Book:");
//         console.log(book);
//     }
// });


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/books", (req, res) => {

    Book.find({}, function (err, booksFromDB) {
        if (err) {
            console.log(err);
        } else {
            res.render("books/index", {books: booksFromDB});
        }
    });

});

app.post("/books", (req, res) => {

    let title = req.body.title;
    let image = req.body.image;
    let newBook = {
        title: title,
        image: image
    };

    Book.create(newBook, (err, newBookToDB) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("books/index");
        }
    });
});

app.get("/books/new", (req, res) => {
    res.render("books/new")
});


//To use referenced data in a template
app.get("/books/:id", (req, res) => {
    Book.findById(req.params.id)
        .populate("comments").exec(function (err, foundBook) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundBook);
            res.render("books/show", {book: foundBook});
        }
    })
});


app.get("/books/:id/comments/new", (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {book: book})
        }
    });
});

app.post("/books/:id/comments", (req, res) => {
    Book.findById(req.params.id, function (err, book) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    book.comments.push(comment);
                    book.save();
                    res.redirect("/books/"+book._id);
                }
            })
        }
    })
});

app.get("/signup", (req, res) => {

            res.render("signup/index");


});


app.listen(3000, () =>
    console.log("Started on port 3000...")
);