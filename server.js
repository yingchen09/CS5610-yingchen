//using express with node js
var express = require('express');
//initialize app as an express application
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport = require('passport');
var cookies = require('cookies');
var sessions = require('sessions');
var LocalStrategy = require('passport-local').Strategy;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/public/assignment'));

require("./assignment/app.js")(app);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});