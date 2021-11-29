"use strict";

const PORT = 4000;

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const { response } = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/search.html", async (req, res) => {
  const model = req.body.model;
  const series = req.body.series;
  console.log("Series: " + series);
  console.log("Model: " + model);

  // set search URL
  let search_url = "http://localhost:3000/pricing/" + model;

  const data = JSON.stringify(await getPricing(search_url));
  res.redirect("/search.html");
});

// GET GPU pricing
async function getPricing(search_url) {
  const response = await axios.get(search_url);
  const data = response.data;
  saveData(data);
}

async function saveData(data) {
  let data_string = JSON.stringify(data);

  fs.writeFile(
    "./public/data/search_data.json",
    data_string,
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("Data file has been created.");
    }
  );
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
