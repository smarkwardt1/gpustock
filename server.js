"use strict";

const PORT = 4000;

const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
// Note: Don't add or change anything above this line.

app.post("/", (req, res) => {
    const search_value = req.body.model;
    const threshold = req.body.threshold;
    console.log("Search Value: " + JSON.stringify(search_value));
    console.log("Threshold: " + JSON.stringify(threshold));

    let search_url = 'http://localhost:3000/pricing/' + search_value;
    console.log("Search URL: " + search_url)
    
    axios.get(search_url)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
