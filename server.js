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



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});