// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// 2nd API endpoint
app.get("/api/:dateString", (req, res) => {
	let strDate = req.params.dateString;
  console.log("1:", strDate)
  strDate = strDate.replace(/ /g,'')
  let date;
  //if strDate is empty assume current date
  !strDate ? date = new Date() : isNaN(strDate)? date = new Date(strDate) : date = new Date(parseInt(strDate))
  console.log(date)
  /** handle response */
	let results;
	if (isNaN(date) || date === "Invalid Date") {
		results = { error: "Invalid Date" };
	} else {
		results = {
			unix: date.getTime(),
			utc: date.toUTCString(),
		};
	}
	res.json(results);
});

app.get("/api/", (req, res) => {
	let date = new Date()
  results = {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };

	res.json(results);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
