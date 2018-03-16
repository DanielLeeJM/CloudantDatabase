require('dotenv').load();

var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;
var url = 'placeholder';
// var url = "https://"+username+":"+password+"@"+username+".cloudant.com"

// var testcreated = require('cloudant-quickstart')(url, 'testcreated');

var nano = require('nano');
var account = nano(url);
var cloudant = nano("https://"+username+".cloudant.com");
// make sure $JSON contains the correct `_rev` value!
var db = account.use('testdb1');
db.destroy('287fa0c6e96db8cfc4c44d5d9a9cd142', '2-7051cbe5c8faecd085a3fa619e6e6337', function (err, body, headers) {
  console.log("Deleting file...")
  if (!err) {
    console.log("Deleted!")
    console.log(body);
  }
  else {
    console.log("No file deleted.")
  }
});
