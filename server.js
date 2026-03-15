//npx nodemon server.js

//libraries

const express = require("express");
const nunjucks = require("nunjucks");
let nedb = require("@seald-io/nedb");

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
  response.render("page3.njk", { title: "Page 3" });
});

app.post("/inquiry", (req, res) => {
  let submission = {
    name: req.body.name,
    question: req.body.question,
  };

  database.insert(submission);

  res.redirect("/");
});


// connecting forismatic quote api (no key needed)
// reading is the quote just in context of the project i used "reading"
// use post? or get?
app.get("/reading", async (req, res) => {
  const reading = await fetch(
    // pulls random quote based on 3 params:
    // 1: method name
    // 2: response format
    // 3: response language 
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en"
  );
  const quote = await reading.text();
  const onlyQuote = quote.split('(')[0]
  res.send(onlyQuote)
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
