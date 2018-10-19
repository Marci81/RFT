const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("The landing page");
});

app.listen(3000, () =>
    console.log("Started on port 3000...")
);