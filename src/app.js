/*
To run::
 nodemon .\src\app.js
 nodemon .\src\app.js -e js,hbs
*/

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const getGeoCode = require("./utils/geocode");
const getForecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

// Setup static director to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main Page",
    name: "Ahmed Ibrahim",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",

    name: "Ahmed Ibrahim",

    job: "Full-stack developer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    header: "Node.js",
    name: "Ahmed Ibrahim",

    message: "It seems to be good",
  });
});
app.get("/weather", (request, response) => {
  const { address } = request.query;
  if (!address) {
    return response.send({
      error: "You must provide an address",
    });
  }

  getGeoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return response.send({
        error: "You must provide a valid address",
      });
    }

    getForecast(latitude, longitude, (error, res) => {
      if (error) {
        console.log(error);
        return response.send({
          error: "Error while fetching forecast ...",
        });
      }

      response.send({
        forecast: res,
        location: location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "This help article is not found",
    name: "Ahmed",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "The searched path is not found",
    name: "Ahmed",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
