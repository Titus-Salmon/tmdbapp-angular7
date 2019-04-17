var express = require('express');
var router = express.Router();

/* on browser's GET request, render successful-delete page. */
// '/successful-delete' is automatically assumed for '/'
/*
router.get('/', function (req, res, next) {
  res.render('successful-delete', {
    title: 'Delete Successful'
  });
});
*/

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, METHODS');
  next();
});

//**Take POST request from browser & do a dyn.deleteItem in order to update database
router.post("/DeleteSuccess", function (req, res, next) {
  const deletePostBody = req.body; //request.body is made by bodyparser.urlencoded, which parses the http message for sent data
  console.log("deletePostBody=");
  console.log(deletePostBody);

  console.log("deletePostBody[\'ssn\']=");
  console.log(deletePostBody['ssn']);


  var AWS = require('aws-sdk');
  var dyn = new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  });


  var params = {
    TableName: "teamster-application-db",
    Key: {
      ssn: { //'ssn' is primary key for 'teamster-application-database' table; must always be included in 'deleteItem' method
        'S': deletePostBody['ssn']
      },
    }
  };
  //regardless of whether ssn already exists in table do dyn.deleteItem
  dyn.deleteItem(params, function (err, data) {
    if (err) {
      console.log(err)
    } // an error occurred
    else {
      console.log('data=');
      console.log(data);
    } // successful response
  });
});

module.exports = router;
