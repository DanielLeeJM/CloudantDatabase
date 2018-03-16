require('dotenv').load();

var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;
var url = 'placeholder';
// var url = "https://"+username+":"+password+"@"+username+".cloudant.com"

// var testcreated = require('cloudant-quickstart')(url, 'testcreated');

var nano = require('nano');
var account = nano(url);
var cloudant = nano("https://"+username+".cloudant.com");

// var nano = require('nano');
// var account = nano("https://"+$USERNAME+":"+$PASSWORD+"@"+$USERNAME+".cloudant.com");
var db = account.use('newdata');

db.get('90d478139f0737dcbc7f388a22096127', function (err, body, headers) {
  if (!err) {
    console.log(body);
  }
  else {
    console.log("No such file found")
  }
});
