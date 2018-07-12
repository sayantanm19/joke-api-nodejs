//
//  Uses script at https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose to populate the database
//  Creates a Joke Collection and fetches jokes from ICNDB for testing
//

console.log('This script populates jokes taken from ICNDB to your database for testing.');
console.log('Specified database as argument - ');
console.log('e.g.: populatedb mongodb://your_username:your_password@your_dabase_url <num of jokes to scrape>');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
var number = process.argv.slice(3);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return;
}

if (!number[0]) {
    console.log('NOTE: You did not specify number to scrape... Defaulting to 1 Joke');
    number = 1;
}

var async = require('async')
var Joke = require('./models/joke')

var request = require('request');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var jokes = []
var datenow = new Date;

var url = 'http://api.icndb.com/jokes/random/' + number;
var i;

function jokeCreate(no, joke, category, date) {
  jokedetail = {
    no: no,
    joke: joke,
    category: category,
    date: date
  }
    
  var joke = new Joke(jokedetail);    
  joke.save(function (err) {
    if (err) {
	  console.log(err);
      return
    }
    console.log('New Joke: ' + joke);
    jokes.push(joke)
  }  );
  
  //mongoose.connection.close();
}

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
	  fill(data);
	}
  });

function fill(data) {
	var size = Object.keys(data.value).length;
  console.log('Writing ' + size + ' records');
  //console.log(datenow.toDateString());
	
	for(i=0;i<size;i++) {
	  jokeCreate(data.value[i].id, data.value[i].joke, data.value[i].categories, datenow.toDateString());
	}
	//mongoose.connection.close();
};




