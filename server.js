"use strict";

const PORT = 4000;

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
// Note: Don't add or change anything above this line.

app.post("/", (req, res) => {
  const model = req.body.model;
  const threshold = req.body.threshold;
  const series = req.body.series;
  console.log("Series: " + series);
  console.log("Model: " + model);
  console.log("Threshold: " + threshold);

  // set search URL
  let search_url = "http://localhost:3000/pricing/" + model;
  console.log("Search URL: " + search_url);

  //calculate threshold price
  function calcMSRP(model) {
    const all_models = [
      { model: "RTX 3060", msrp: 329 },
      { model: "RTX 3060 Ti", msrp: 399 },
      { model: "RTX 3070", msrp: 499 },
      { model: "RTX 3070 Ti", msrp: 599 },
      { model: "RTX 3080", msrp: 699 },
      { model: "RTX 3080 Ti", msrp: 1199 },
      { model: "RTX 3090", msrp: 1499 },
      { model: "RX 6600", msrp: 329 },
      { model: "RX 6600 XT", msrp: 379 },
      { model: "RX 6700 XT", msrp: 479 },
      { model: "RX 6800", msrp: 579 },
      { model: "RX 6800 XT", msrp: 649 },
      { model: "RX 6900 XT", msrp: 999 },
    ];

    for (let i in all_models) {
      if (all_models[i].model === model) {
        return all_models[i].msrp;
      }
    }
  }
  const search_msrp = calcMSRP(model);
  console.log("Search MSRP: " + search_msrp);

  // GET GPU pricing
  axios
    .get(search_url)
    .then(function (response) {
      // handle success
      console.log(response.body);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

function calcThreshPrice(threshold) {}

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
