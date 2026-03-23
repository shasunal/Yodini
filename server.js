//npx nodemon server.js

//libraries

const express = require("express");
const nunjucks = require("nunjucks");
let nedb = require("@seald-io/nedb");
let verdict = require("./public/script/verdict.js");

//initialize
const app = express();
let database = new nedb({ filename: "data.db", autoload: true });


//setup nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (request, response) => {
  response.render("index.njk", { title: "Home" });
});

app.get("/page2", (request, response) => {
  response.render("page2.njk", { title: "Page 2" });
});

app.get("/page3", (request, response) => {
  let query = {};
  database.find(query, (error, foundData) => {
    if (error) {
      response.send("error");
    } else {
      let formattedJSON = {
        allData: foundData,
      };
      response.render("page3.njk", { data: formattedJSON.allData[formattedJSON.allData.length - 1] });
    }
  });
});

// clean up old code, I used a for loop instead of doing each individual quote, and it will be called on through the index instead
app.post("/inquiry", async (request, response) => {
  const quotes = [];

  for (let i = 0; i < 3; i++) {
    // in api each quore is assigned a numeric key, max. is 6 digits long
    // this should prevent possible quote duplicates
    const randomKey = Math.floor(Math.random() * 999999);
    const reading = await fetch(`http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en&key=${randomKey}`);
    // this get rid of the quote author at the end of the text version of the data
    const quote = (await reading.text()).split('(')[0];
    quotes.push(quote);

    if (i < 2) await new Promise(resolve => setTimeout(resolve, 500));
  }

  database.insert({ 
    name: request.body.name, 
    question: request.body.question, 
    reading: verdict[Math.floor(Math.random() * verdict.length)], 
    quote1: quotes[0], 
    quote2: quotes[1], 
    quote3: quotes[2]
  });

  response.redirect("/page2");
});


// this version didn't work because it would create duplicate quotes
// app.post("/inquiry", async (request, response) => {

//   const reading1 = await fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en");
//   const quote1 = await reading1.text();
//   const onlyQuote1 = quote1.split('(')[0];

//   await new Promise(resolve => setTimeout(resolve, 500));

//   const reading2 = await fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en");
//   const quote2 = await reading2.text();
//   const onlyQuote2 = quote2.split('(')[0];

//   await new Promise(resolve => setTimeout(resolve, 500));

//   const reading3 = await fetch("http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en");
//   const quote3 = await reading3.text();
//   const onlyQuote3 = quote3.split('(')[0];

//   database.insert({ 
//     name: request.body.name, 
//     question: request.body.question, 
//     reading: verdict[Math.floor(Math.random() * verdict.length)], 
//     quote1: onlyQuote1, 
//     quote2: onlyQuote2, 
//     quote3: onlyQuote3 
//   });

//   response.redirect("/page2");
// });


// connecting forismatic quote api (no key needed)
// reading is the quote just in context of the project i used "reading"
// use post? or get?
// app.get("/reading", async (req, res) => {
//   const reading = await fetch(
//     // pulls random quote based on 3 params:
//     // 1: method name
//     // 2: response format
//     // 3: response language 
//     "http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en"
//   );
//   const quote = await reading.text();
//   const onlyQuote = quote.split('(')[0]
//   res.send(onlyQuote)
// });

// clears the db when the user is done so that the next submissin shows properly
app.post("/cleardata", (req, res) => {
  // three params:
  // 1: {} deletes all records in the db file
  // 2: multi:true, is required by nEdb ot delete multiple records at once
  // 
  database.remove({}, { multi: true }, (error, numRemoved) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
