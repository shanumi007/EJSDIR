const express = require("express");
const app = express();
const path = require("path");

const port = 8080;


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public/css")));
/* ejs is already internally acquired in express; const express = require("express"); */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    // res.send("This is home.");
    res.render("home.ejs");  // by default require("express") will look into the views directory
});
app.get("/hello", (req, res) => {
    res.send("<h1>Hello! Greetings from Shanu Mishra.</h1>");
});
app.get("/roll", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) +1;
    // res.render("rollDice.ejs", { num : diceVal });
    res.render("rollDice.ejs", { diceVal });
});
/*
app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const followers = ["Abhimanyu", "Arjuna", "Bhima", "Bhismah", "Nakula", "Sahadeva", "Shri Krishna", "Yudishtir"];
    res.render("insta.ejs", { username, followers });
});
*/
app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    console.log(instaData);
    const data = instaData[username];
    console.log(data);
    if(data) {
        res.render("insta.ejs", { data });
    } else {
        res.render("error.ejs");
    }
});
