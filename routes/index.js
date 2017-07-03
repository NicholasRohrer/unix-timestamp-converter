var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:time', function(req, res, next){

  function unixToNatural(unix) {
    var date = new Date(unix * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    return month + ' ' + day + ', ' + year;
  }


  if (!isNaN(req.params.time)) {
    var result = unixToNatural(req.params.time);
    var data = { unixDate: req.params.time, naturalDate: result };
    res.json(data);
  }
});

module.exports = router;
