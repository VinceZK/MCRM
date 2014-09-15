var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});*/

// angular启动页
router.get('/', function (req, res) {
    res.render( '../app/index.html');
});

router.get('/login', function (req, res) {
    res.render( '../app/index.html');
});

module.exports = router;
