require('dotenv').load();

var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;

var url = 'placeholder';
// var url = "https://"+username+":"+password+"@"+username+".cloudant.com"

// var testcreated = require('cloudant-quickstart')(url, 'testcreated');

var nano = require('nano');
var account = nano(url);
var cloudant = nano("https://"+username+".cloudant.com");

account.request(function (err, body) {
  if (!err) {
    console.log(body);
  }
});

// var cookies = {}

cloudant.auth(username, password, function (err, body, headers) {
  if (!err) {
    cookies[username] = headers['set-cookie'];
    cloudant = nano({
      url: "https://"+username+".cloudant.com",
      cookie: cookies[username]
    });

    // ping to ensure we're logged in
    cloudant.request({
      path: 'test_porter'
    }, function (err, body, headers) {
      if (!err) {
        console.log(body, headers);
      }
      else {
        console.log("Could not connect to server.")
      }
    });
  }
});

account.db.create('newdata', function (err, body, headers) {
  console.log("")
  console.log("Attempting to create new DB")
  console.log("---------------------------------")
  console.log("")
  if (!err) {
    console.log(body);
      }
  else {
    console.log("Cannot Create DB Identical name found")
    console.log("---------------------------------")
    console.log("")
  }
  console.log("Getting DB Info")
  account.db.get('newdata', function (err, body, headers) {
      if (!err) {
        console.log(body);
      }
      else {
        console.log("Cannot find DB")
      }
});
});

// account.db.get('newdata', function (err, body, headers) {
//   if (!err) {
//     console.log(body);
//   }
// });

account.db.list(function (err, body, headers) {
  console.log("")
  console.log("2. Listing all databases")
  console.log("---------------------------------")
  console.log("")
  if (!err) {
    console.log(body);
  }
});

 var db = account.use('newdata');
 db.list(function (err, body, headers) {
   console.log("")
   console.log("5. Printing contents of newdata")
   console.log("---------------------------------")
   console.log("")
   if (!err) {
    console.log(body);
  }
});

account.db.changes('newdata', function (err, body, headers) {
  console.log("")
  console.log("3.Recent change string")
  console.log("---------------------------------")
  console.log("")
  if (!err) {
    console.log(body);
    // console.log(headers);
  }
});

account.request({db: 'newdata', path: '_security'}, function (err, body, headers) {
  console.log("")
  console.log("4. Returning security and priviledges for newdata")
  console.log("---------------------------------")
  console.log("")
  if (!err) {
    console.log(body);
  }
});
