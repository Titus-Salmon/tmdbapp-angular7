var express = require('express');
var router = express.Router();

/* on browser's GET request, render successful-edit page. */
// '/apply' is automatically assumed for '/'
/*
router.get('/', function (req, res, next) {
  res.render('successful-edit', {
    title: 'Edit Successful'
  });
});
*/

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, METHODS');
  next();
});

//**Take POST request from browser & do a dyn.putItem in order to update database
router.post("/EditSuccess", function (req, res, next) {
  const editPostBody = req.body; //request.body is made by bodyparser.urlencoded, which parses the http message for sent data
  console.log("editPostBody=");
  console.log(editPostBody);

  console.log("editPostBody[\'unionNumber\']=");
  console.log(editPostBody['unionNumber']);


  var AWS = require('aws-sdk');
  var dyn = new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  });


  var params = {
    TableName: "teamster-application-db",
    Item: { // a map of attribute name to AttributeValue
      union_number: {
        'S': editPostBody['unionNumber']
      },
      date: {
        'S': editPostBody['date']
      },
      lname: {
        'S': editPostBody['lastName']
      },
      fname: {
        'S': editPostBody['firstName']
      },
      mi: {
        'S': editPostBody['middleInit']
      },
      occupation: {
        'S': editPostBody['occupation']
      },
      address: {
        'S': editPostBody['streetAdd']
      },
      phone: {
        'S': editPostBody['phone']
      },
      city: {
        'S': editPostBody['city']
      },
      state: {
        'S': editPostBody['state']
      },
      zip: {
        'S': editPostBody['zip']
      },
      employer: {
        'S': editPostBody['emp']
      },
      employment_date: {
        'S': editPostBody['empDate']
      },
      employer_address: {
        'S': editPostBody['empAddr']
      },
      employer_phone: {
        'S': editPostBody['empPhone']
      },
      employer_city: {
        'S': editPostBody['empCity']
      },
      employer_state: {
        'S': editPostBody['empState']
      },
      employer_zip: {
        'S': editPostBody['empZip']
      },
      fee: {
        'S': editPostBody['initFee']
      },
      paid_to: {
        'S': editPostBody['paidTo']
      },
      dob: {
        'S': editPostBody['dob']
      },
      ssn: { //'ssn' is primary key for 'teamster-application-database' table; must always be included in 'putItem' method
        'S': editPostBody['ssn']
      },
      membership: {
        'S': editPostBody['previous']
      },
      previous_union_number: {
        'S': editPostBody['prevNumber']
      },
    }
  };
  //regardless of whether ssn already exists in table do dyn.putItem
  dyn.putItem(params, function (err, data) {
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
