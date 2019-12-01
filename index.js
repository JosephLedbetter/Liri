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