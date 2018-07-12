var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var jokeSchema = new Schema({
    no: Number,
    joke: String,
    category: String,
    date: Date
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('joke', jokeSchema);