const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
var config = require('./config');

const app = express();
var Joke = require('./models/joke');

console.log('PORT IS' + config.port)

//Set up default mongoose connection

mongoose.connect(config.mongoURL);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected Succesfully')
});

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('public/index.html');
});

//Get a list of all Jokes in Database
app.get('/all', (req, res) => {
  //send('All Jokes in DB Here');
  Joke.find({}, function(err, result) {
    if (err) throw err;
    res.send(result);
	})
  });
  
//Get a random Joke from Database
app.get('/random', (req, res) => {

	Joke.aggregate([ { $sample: { size: 1 } }], function(err, result) {
	if (err) throw err;
	res.send(result);
	})
});

//Get N number of random jokes along with optional name modifers
app.get('/random/:num', (req, res) => {
	
  //Capture queries from URL
  fname = req.query.fname;
  lname = req.query.lname;
  num = parseInt(req.params.num);

  Joke.aggregate([ { $sample: { size: num } }], function(err, result) {
	if (err) throw err;
	
	//Change to String for name replacement
	string = JSON.stringify(result);
	
	//If First Name is specified
	if (fname) {
		console.log('changing to fname:  ' + fname);
		string = string.replace(/Chuck/gi, fname);
	}
	//If Last Name is specified
	if (lname) {
		console.log('changing to lname:  ' + lname);
		string = string.replace(/Norris/gi, lname);
	}
	//Parse back to JSON
	result = JSON.parse(string);
	
	//Display result
	res.send(result);
	})
});

//List All Categories in Database
app.get('/categories', (req, res) => {
  Joke.collection.distinct("category", function(err, result) {
    if (err) throw err;
    res.send(result);
	})
  });
  
//mongoose.connection.close();

app.listen(config.port, () => {
  console.log('Example app listening on port!' + config.port);
});
