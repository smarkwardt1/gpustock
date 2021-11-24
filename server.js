"use strict";

const PORT = 4000;

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { response } = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/", (req, res) => {
  const model = req.body.model;
  const threshold = req.body.threshold;
  const series = req.body.series;
  console.log("Series: " + series);
  console.log("Model: " + model);
  console.log("Threshold: " + threshold);

  // set search URL
  let search_url = "http://localhost:3000/pricing/" + model;

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

  //maybe not send
  const data = getPricing(search_url);
  res.send(stringifyJSON(data));
});

// GET GPU pricing
async function getPricing(search_url) {
  const response = await axios.get(search_url);
  const data = response.data;
  return data;
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
