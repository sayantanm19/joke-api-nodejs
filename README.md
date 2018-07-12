# joke-pi => Simple ICNDB Clone in Node.js 

![Example of JSON Output:](/images/example_random.png)

joke-api is a simple clone of the popular ICNDB (The Internet Chuck Norris Database) that has for years provided a free open API to get random jokes.

### Usage

```
https://localhost/all
```
This retrieves all jokes in the database
```
https://localhost/random
```
To fetch 1 Random Joke from the Database
```
https://localhost/random/[num_of_jokes]
```
To fetch [num_of_jokes] random jokes from the Database
```
https://localhost/random/[num_of_jokes]?fname=Casey&lname=Caesam
```
Fetch [num_of_jokes] random jokes from the Database and replaces Chuck And Norris with the name specified in fname and lname query
```
https://localhost/random/categories
```
Fetches all categories in the database

### Tech Stack

Name_TODO uses a number of technologies:
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com) - fast node.js network app framework
* [MongoDB](https://www.mongodb.com) - database for storing the jokes
* [Mongoosejs](http://mongoosejs.com) - ODM for interacting with the MongoDB

Other developer dependencies include:
* [nodemon](https://nodemon.io) - to auto-reload the server after changes
* [Request](https://github.com/request/request) - used for populating the database for test use

### Installation

joke-api requires [Node.js](https://nodejs.org/) v4+ to run.

It requires MongoDB server(service like MLab or Local deployment) to store the jokes. You also need to populate the server with some data. For this, I will be using this script given in [MDN Docs Node.js Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose), to scrape the jokes from [ICNDB](http://www.icndb.com/api/) itself for testing.

Change the MongoURl and port in the config.js file before running.

```sh
$ cd name
$ node populatedb <mongourl> <number_of_jokes>
```

Install the dependencies and devDependencies and start the server.

```sh
$ cd name
$ npm install -d
$ npm run devstart
```

### Todos

 - Write a welcome page and present a graphical way to access the jokes
 - Add proper MVC structure
 - Implement security features and best-practices

License
----

MIT License
