var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:time', function(req, res, next){

  // convert unix time to natural time
  function unixToNatural(unix) {
    var date = new Date(unix * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    return month + ' ' + day + ', ' + year;
  }

  // if the parameter IS a unix number
  if (!isNaN(req.params.time)) {
    var result = unixToNatural(req.params.time);
    var data = { unixDate: req.params.time, naturalDate: result };
    res.json(data);
  } else {
     var natural = new Date(req.params.time);
     // if natural is a valid date string, convert to miliseconds
     if (!isNaN(natural)){
       var unix = natural / 1000;
       var data = { unixDate: unix, naturalDate: req.params.time };
       res.json(data);
     } else {
        res.json( { unixDate: null, naturalDate: null });
     }
  }
});

module.exports = router;
