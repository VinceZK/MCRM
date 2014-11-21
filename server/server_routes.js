var express = require('express');
var router = express.Router();
var auth = require('./controllers/server_auth');

/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});*/


// angular启动页
router.get('/login', function (req, res) {
    res.render( 'login');
});

router.get('/app/*', function (req, res) {
    res.render( 'index');
});

// Restful APIs
router.post('/api/login', auth.doLogin);
router.get('/api/login', auth.ensureAuthenticated, auth.session);
module.exports = router;
