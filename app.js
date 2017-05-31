var express = require('express');

var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var port = 3000;
//var config = require('config');
var booksRouter = require('./routes/booksRouter');

//db connection      
mongoose.connect("mongodb://localhost/books");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

mongoose.Promise = Promise;

//don't show the log when it is test
// if(config.util.getEnv('NODE_ENV') !== 'test') {
//     //use morgan to log at command line
//     app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));    

app.get('/', (req, res) => res.json({message: "Welcome to our BookStore"}));

app.use('/api/books', booksRouter);


app.listen(port, () => {
    console.log('Server listening on port 3000');
});

module.exports = app;
