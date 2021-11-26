const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { strict } = require("assert");
// const mongoose = require('mongoose')
const path = require("path");
const { google } = require("googleapis");
require('dotenv').config()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views/static"));

const auth = new google.auth.GoogleAuth({
  keyFile: "keys.json", //the key file
  //url to spreadsheets API
  scopes: "https://www.googleapis.com/auth/spreadsheets", 
});


// const {regUserModel, msgModel, statusModel} = require('./db/registerSchema')

// go below for writing the data

// Writing the data into the spreadsheets

let registrationCount = 2;  

let messageCount = 2;

async function writeRegisterData(arr) {
  
  try{
    const authClient = await auth.getClient()

    const sheet = google.sheets({version: 'v4', auth: authClient})

    const updatedData = await sheet.spreadsheets.values.update({
      spreadsheetId: "1Mh19aDOkdo9poe88RFbMj6fmgjiL9_TLBHuZn90E_74",
      range: `Sheet1!A${registrationCount}:S${registrationCount}`,
      valueInputOption: "USER_ENTERED",
      requestBody:{
        values: [arr]
      }
    })
    console.log(updatedData.data)
    registrationCount++;
  }catch(e){
    console.log(e)
  }
  
}

async function writeMessageData(arr) {
  
  try{
    const authClient = await auth.getClient()

    const sheet = google.sheets({version: 'v4', auth: authClient})

    const updatedData = await sheet.spreadsheets.values.update({
      spreadsheetId: "1NWEDWKUyO4-XP7-OeXfkC7ncFrzOxscFAHpwVwQjTyg",
      range: `Sheet1!A${messageCount}:C${messageCount}`,
      valueInputOption: "USER_ENTERED",
      requestBody:{
        values: [arr]
      }
    })
    console.log(updatedData.data)
    messageCount++;
  }catch(e){
    console.log(e)
  }
}




let launchStatusCode = true // Timer
let tokenCode = "saL7aJpLA1t1kvdjlVNRr6DlklPaRCRpceILOJGAHwtEbq6hadUMsAtG3xyeHdyJ9ozvgRSWavZzLhXwHYWj1T5lqLXe0Ebumw4xX72WAhcpKd8rXOjJCv5KQgKGmxvCvu0Ei6YOTHrGl7cnVIGcn0hbrsANKAc0gI3wYEhqf52xXEs26cT9V7W9d6f4iXXLTouKxQvCEQQW4lvrXh3Px1iEa2swDOERLzTwFIaliuYf9xlAn534zSvnS0"
const launchStatus = async (req, res, next) => {
  try{
    if(launchStatusCode){
      next()
    }else{
      if(req.query.token === tokenCode){
        res.sendFile((path.join(__dirname + "/views/static/countdown/Countdown_kapish.html")))
      }else{
        res.sendFile((path.join(__dirname + "/views/static/countdown/Countdown.html")))
      }
    }
  }catch(e){
    console.log(e)
  }
}

const notLaunchStatus = (req, res, next) => {
  if(!launchStatusCode){
    next()
  }else{
    res.render('index')
  }
}
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", launchStatus, function (req, res) {
  res.render("index");
});

app.get("/register", launchStatus, function (req, res) {
  res.render("Alum-reg");
});

app.get("/contact", launchStatus, (req, res) => {
  res.render("contact");
});

app.get("/form", launchStatus, function (req, res) {
  res.render("form");
});


app.post("/message", async (req, res) => {
  let userData = [
    req.body.name,
    req.body.email,
    req.body.message,
  ];
  try{
    await writeMessageData(userData);
    res.redirect("/")
  }catch(e){
    console.log(e)
    res.send("an Error occoured! please retry")
  }
});

app.post("/register", async (req, res) => {
  let userData = []
  for (let key in req.body){
    userData.push(req.body[key])
  }
  try{
    await writeRegisterData(userData)
    res.redirect('/')
  }catch(e){
    console.log(e)
    res.send("an Error occoured! please retry")
  }
});

app.get("/our-team", launchStatus, (req, res) => {
  res.render("our-team");
});

app.get("/aboutus", launchStatus, (req, res) => {
  res.render("aboutus");
});

app.get("/atalk", launchStatus, (req, res) => {
  res.render("Atalk");
});

app.get("/va-meet", launchStatus, (req, res) => {
  res.render("va-meet");
});

app.get("/mentorship", launchStatus, (req, res) => {
  res.render("mentorship-program");
});

app.get("/fullteam", launchStatus, (req, res)=>{
  res.render("FullTeam");
})
app.get('/activate', notLaunchStatus, (req, res)=> {
 launchStatusCode = true;
 res.render('index')
})

app.put('/setActivation', (req, res)=>{
  if(req.body.status == "false"){launchStatusCode = false;}
  else{launchStatusCode = true}
  res.send(launchStatusCode)
})

app.listen(process.env.PORT || 4500, function () {
  console.log("Server running at port 4500");
});


