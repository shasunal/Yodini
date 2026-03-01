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
pp.get("/", (request, response) => {
  response.render("index.njk", { title: "Home" });
});