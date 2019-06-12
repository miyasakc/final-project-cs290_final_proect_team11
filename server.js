
var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var fs = require("fs");
var bodyParser = require('body-parser');
var mongoClient = require("mongodb").MongoClient;

var db = null;

var mongoHost = process.env.MONGO_HOST || "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER || "cs290_leeza";
var mongoPassword = process.env.MONGO_PASSWORD || "TemporaryPasswordForTheDemo";
var mongoDBName = process.env.MONGO_DATABASE || "cs290_leeza";

var mongoURL =
	'mongodb://' + mongoUser + ':' + mongoPassword + '@' +
	mongoHost + ':' + mongoPort + '/' + mongoDBName;



app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/monteCarlo.html');
  });

mongoClient.connect(mongoURL, {useNewUrlParser: true}, function (err, client) {
  if (err) {
    throw err;
  }
  var db = client.db(mongoDBName);
	console.log("== Connected to database");
	app.listen(3001, function () {
    console.log("== Server listening on port 3001");
  });
	app.post('/data/updateDB', function(req, res, next){
		db.collection('sim_info').insertOne(req.body);
	});
	app.get('/data/initGlobals', function(req, res, next){
		var collection = db.collection('sim_info').find({});
		var coll_array = [];
		collection.toArray(function (err, data){
			for(var i in data){
				coll_array.push(data[i]);
			}
			res.body = coll_array;
			res.readyState = 4;
			res.status(200).send();
		});
	});
});
