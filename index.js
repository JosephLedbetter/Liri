require("dotenv").config();
const keys = require("./keys.js");
const spotifyapi = require("node-spotify-api");
const spotify = new spotifyapi(keys.spotify);
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");

let command = process.argv[2];
let searchQuery = process.argv.slice(3).join("+");

let divider = "\n-------------------------------------------\n";

const searchConcert = () => {
    let apiQuery = "https://rest.bandsintown.com/artists/" + searchQuery + "/events?app_id=codingbootcamp";

    axios
    .get(apiQuery)
    .then(function (response) {
