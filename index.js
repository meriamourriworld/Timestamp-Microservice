// index.js
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
app.get("/api/:date", function (req, res) {
  if(req.params.date)
  {
    console.log("param")
    let {date} = req.params;
    if(new Date(date) == "Invalid Date" && isNaN(date)){return res.json({ "error" : "Invalid Date" });}
      else 
      {
          if(isNaN(date))
          {
            const d = new Date(date);
            const d1 = d.getTime();
            res.json({"unix":d1, "utc": d.toUTCString()});
          }else
          {
            date = Number(date);
            const time = new Date(date);
            res.json({"unix":date, "utc": time.toUTCString()});
          }
      }
  }else
  {
    console.log("aucun param")
    const current = new Date();
    res.json({"unix": current.getTime() , "utc": current.toUTCString()});
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
