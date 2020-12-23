const express = require("express");
const path = require("path");
const mysql = require("mysql");

 
const app = express();
//set "public" folder to be static folder, user can access it directly
app.use(express.static(path.join(__dirname, "public")));
 
// for express > 4.16
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//or
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json()); 

 
// ============= Page routes ==============
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Homepage.html"));
});


app.get("/Loginpage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Loginpage.html"));
});
 
app.get("/Registerpage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Registerpage.html"));
});

app.get("/Chooserolepage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Chooserolepage.html"));
});

app.get("/Listpage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/List.html"));
});

app.get("/Notificationpage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Notificationpage.html"));
});

app.get("/Paymentapge", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Paymentpage.html"));
});

app.get("/Profilepage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Profilepage.html"));
});

app.get("/adminpage", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Adminpage.html"));
});

 


// ============= Login ==============
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    const sql = "SELECT username, role FROM user WHERE USERNAME=? AND PASSWORD=?";
    con.query(sql, [username, password], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).end("Server error");
            return;
        }
 
        // result is an array of records from database
        const numrows = result.length;
        //if no data
        if (numrows != 1) {
            res.status(401).end("Wrong username or password");
        }
        else {
            //correct login send destination URL to client
            // only 1 row -> result[0]
            res.send("/welcome");
        }
    });
});

///=====register========
app.post("/register",function(req,res){
    const username = req.body.username;
    const password = req.body.password; 
    const Phonenumber = req.body.Phonenumber;
});
    



const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});