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

        for (let i = 0; i < response.data.length; i++) {

            // standard date
            let dateTime = response.data[i].datetime;
            let dateArr = dateTime.split("T");
            let concertDate = moment(dateArr[0]).format("MM-DD-YYYY");

            // concert results object
            concertResults =
                    divider +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of Concert: " + concertDate 

                    console.log(concertResults);
                }
            })
    // all error responses for requests
    .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if (error.request) {
            console.log(error.request);
        } 
        else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}
