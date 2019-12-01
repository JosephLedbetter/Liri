require("dotenv").config();
const keys = require("./key.js");
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

// full spotify api call
const spotifySong = () => {
    if (!searchQuery) {
        searchQuery = "The Sign Ace of Base";
    }
    spotify.search({ type: 'track', query: searchQuery })
    .then(function (response) {
        for (let i = 0; i < 5; i++) {
            let spotifyResults =
            divider +
            "\nArtist(s): " + response.tracks.items[i].artists[0].name +
            "\nSong Name: " + response.tracks.items[i].name +
            "\nPreview Link: " + response.tracks.items[i].preview_url +
            "\nAlbum Name: " + response.tracks.items[i].album.name;
        console.log(spotifyResults);
    }
})
.catch(function (err) {
    console.log(err);
});
}

// omdb call for all relative data
const movieThis = () => {
    if(!searchQuery){
        searchQuery = "Mr. Nobody";
        console.log("\nIf you haven't watch Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netlix!\n");
    }
axios.get("https://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            let movieResults = 
                divider +
                    "\nMovie Title: " + response.data.Title + 
                    "\nRelease Year: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const doThis = () => {

    fs.readFile("bb.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        let dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
}

if (command == "concert-this") {
    searchConcert();
} else if (command == "spotify-this-song") {
    spotifySong();
} else if (command == "movie-this") {
    movieThis()
} else if (command == "do-what-it-says") {
    doThis();
}