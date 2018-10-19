const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/books", (req, res) => {
    let books = [
        {
            title: "Harry Potter",
            image: "https://images.unsplash.com/photo-1530027801118-fee21a67b3af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e271bf72dbc65bf5970a850e314d5ce&auto=format&fit=crop&w=750&q=80"
        },
        {
            title:"Guiness World Records",
            image: "https://images.unsplash.com/photo-1527422265102                     -22027ee90fcd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a9a1bba5014e41cb84a45574a9c87901&auto=format&fit=crop&w=700&q=60"
        }
    ];1
    res.render("books");
});

app.listen(3000, () =>
    console.log("Started on port 3000...")
);