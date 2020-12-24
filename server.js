const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");



// ----- Mysql ------
const mysql = require('mysql');
const config = require('./dbConfig.js');
const { response } = require("express");
const database = mysql.createConnection(config);

 
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

app.get("/Formlaunder", function (req, res) {
    res.sendFile(path.join(__dirname, "views/Formlaunder.html"));
});

 


// ============= Login ==============
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    const sql = "SELECT username, role FROM user WHERE USERNAME=? AND PASSWORD=?";
    con.query(sql, [username, password], function (err, result) {
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
            if (same) {
                
                if (result[0].role == 1) {
                    res.json({ url : "/admin", user_id});
                } else {
                    res.json({ url :"/Chooserlepage"});
                }           
            
            }
        }
    });
});
// ======= Password gen =======
app.get("/password/:raw", (req, res) => {
    const raw = req.params.raw;
    bcrypt.hash(raw, 10, function(err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Hashing password error.");
            
        } else {
            res.send(hash);
            console.log("Password length: ", hash.length);
        }
 
    });
});
///=====register========
app.post("/register",function(req,res){
    const username = req.body.username;
    const password = req.body.password; 
    const phonenumber = req.body.Phonenumber;
    const gender = req.body.gender;

    //encrypt password
    const saltRounds = 10;    //the cost of encrypting
 
    bcrypt.hash(password, saltRounds, function(err, hash  ,fields) {
        if(err) {
            console.error(err.message);
            res.status(500).send("Server error");
            return;
        }
        
        //hash OK, do the rest here because of async hashing process!
        // insert new user (role is 2)
        const sql = "INSERT INTO user(username, password, , gender , Phone, role) VALUES(?,?,?,?,2)";
        con.query(sql, [username, hash], function (err, result, fields) {
            if (err) {
                console.error(err.message);
                res.status(500).send("Database server error");
                return;
            }           
            
            // get inserted rows
            const numrows = result.affectedRows;
            if(numrows != 1) {
                console.error("Insert to DB failed");                
                res.status(500).send("Database server error");
            }
            else {
                res.send("Sign up Complete!");
            }
        });
    });
});





//=====Post Form============
app.get("/form",function(req,res){

    const sql = "SELECT* FROM form"
    con.query(sql ,function(err,result){
        if(err){
        console.log(err);
        res.status(500).end("Server error");
        }
        else{
            res.json(result)
        }
    });
});    

//==========Create form===============
app.post("/Create", function(req,res){

    const fabric = req.body.fabric;
    const sumprice = req.body.sumPrice;
    const separateprice = req.body.separateprice;
    const time = req.body.time; 
    const gender = req.body.onlygender;

    const sql = "INSERT INTo form(fabric, sumPrice, separatePrice, time, onlygender) VALUES(?,?,?,?,?)"
    con.query(sql ,function(err,result){
        if(err){
        console.log(err);
        res.status(500).end("Server error");
        }
        else{
            res.json(result)
        }
    });

});



const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});