var debug = require('debug')('MCRM');
var express = require('express');
var session = require('express-session');
var path = require('path');
var ejs = require('ejs');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./server/server_routes');
var auth = require('./server/controllers/server_auth');
var app = express();

// views engine setup

app.set('views', path.join(__dirname, 'app/views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
/*The express.static make MIME files accessible*/
app.use(express.static(path.join(__dirname, 'app')));

app.use(logger('dev'));
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'darkhouse'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(auth.localStrategy);
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);

/* expressjs routes is not used when using angular*/
app.use('/', routes);
//app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('server_error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('server_error', {
        message: err.message,
        error: err
    });
});

//module.exports = app;
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});