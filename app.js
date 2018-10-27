const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

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
            image: "https://images.unsplash.com/photo-1532348374062-fee19177e98f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4086d5d36662ba037e49111340611aa&auto=format&fit=crop&w=700&q=60"
        }
    ];
    res.render("books",{books:books});
});

app.post("/books",(req,res)=>{
    res.send("You hit the post route");
});

app.get("/books/new",(req,res)=>{
    res.render("new.ejs")
});



app.listen(3000, () =>
    console.log("Started on port 3000...")
);