const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// const e = require("express");
const { strict } = require("assert");
const path = require("path");
const { google } = require("googleapis");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views/static"));

// go below for writing the data

// Writing the data into the spreadsheets

let count = 2;  

let register = 2;

async function writeData(arr) {
  const auth = await new google.auth.GoogleAuth({
    keyFile: "./key.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = await google.sheets({ version: "v4", auth: auth });

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: "1pK1VKKGF7pGbhPzDZnh39nEDGylWZ5zxEduha1xtzIM",

    requestBody: {
      data: [
        {
          range: `Sheet1!A${count}:D${count}`,
          majorDimension: "COLUMNS",
          values: arr,
        },
      ],
      valueInputOption: "USER_ENTERED",
    },
  });
  count += 1;
}

// Below is for updating the registartions data

async function registerData(arr) {
  const auth = await new google.auth.GoogleAuth({
    keyFile: "./key.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = await google.sheets({ version: "v4", auth: auth });

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: "12q6VosuGSz3efO6_apCGu1immioQLrzdok8cLwVYNh8",

    requestBody: {
      data: [
        {
          range: `Sheet1!A${register}:O${register}`,
          majorDimension: "COLUMNS",
          values: arr,
        },
      ],
      valueInputOption: "USER_ENTERED",
    },
  });
  register += 1;
}

let isLaunched = false
let tokenCode = "saL7aJpLA1t1kvdjlVNRr6DlklPaRCRpceILOJGAHwtEbq6hadUMsAtG3xyeHdyJ9ozvgRSWavZzLhXwHYWj1T5lqLXe0Ebumw4xX72WAhcpKd8rXOjJCv5KQgKGmxvCvu0Ei6YOTHrGl7cnVIGcn0hbrsANKAc0gI3wYEhqf52xXEs26cT9V7W9d6f4iXXLTouKxQvCEQQW4lvrXh3Px1iEa2swDOERLzTwFIaliuYf9xlAn534zSvnS0"
const launchStatus = (req, res, next) => {
  if(isLaunched){
    next()
  }else{
    if(req.query.token === tokenCode){
      res.sendFile((path.join(__dirname + "/views/static/countdown/Countdown_kapish.html")))
    }else{
      res.sendFile((path.join(__dirname + "/views/static/countdown/Countdown.html")))
    }
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", launchStatus, function (req, res) {
  res.render("index");
});

app.get("/register", function (req, res) {
  res.render("Alum-reg");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/", (req, res) => {
  
  let UserData = [
    [req.body.email],
    [req.body.firstname],
    [req.body.from],
    [req.body.msg],
  ];
  writeData(UserData);
  res.render("index");
});

app.post("/register", (req, res) => {
  
  let UserData = [
    [req.body.firstname],
    [req.body.lastname],
    [req.body.email],
    [req.body.contact],
    [req.body.course],
    [req.body.branch],
    [req.body.city],
    [req.body.organisation],
    [req.body.designation],
    [req.body.exams],
    [req.body.examyear],
    [req.body.highcourse],
    [req.body.institute],
    [req.body.year],
  ];
  registerData(UserData);
  res.render("index");
});

app.get("/our-team", (req, res) => {
  res.render("our-team");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.get("/atalk", (req, res) => {
  res.render("Atalk");
});

app.get("/va-meet", (req, res) => {
  res.render("va-meet");
});

app.get("/mentorship", (req, res) => {
  res.render("mentorship-program");
});

app.get("/fullteam", (req, res)=>{
  res.render("FullTeam");
})
app.get('/activate', (req, res)=> {
  isLaunched = true
  res.redirect('/')
})

app.listen(process.env.PORT || 4500, function () {
  console.log("Server running at port 4500");
});
