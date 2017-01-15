const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AuthController = require('./controllers/auth');
const WebsiteController = require('./controllers/website');
const Error = require('./errors/general');
const TokenService = require('./services/token');

// parsing the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// log every request
app.use((req, res, next) => {
    const token = req.header('Authorization');
    console.log(req.method, req.url, token ? token : '');
    next();
});

// check JSON syntax error
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return next(Error.JsonSyntax);
    }
    next();
});

// check empty body in POST requests
app.use((req, res, next) => {
    if (req.method == 'POST' && Object.keys(req.body).length == 0 && req.body.constructor == Object) {
        return next(Error.EmptyBody);
    }
    next();
});

// controllers

// this routes don't need token

// auth
app.use('/auth', AuthController);

// auth checker
app.use((req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        return next(Error.NoAuthorization);
    } else {
        TokenService.checkToken(token)
            .then((t) => {
                if (t != null) {

                    // add authenticated user to request body
                    req.body.AuthUser = t.user;
                    return next();
                } else {
                    return next(Error.InvalidToken);
                }
            })
    }
});

// these routes need token

// website
app.use('/website', WebsiteController);

// error handler
app.use((err, req, res, next) => {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    // log error
    console.log(req.method, req.url, 'error', err.body);

    // send error
    res.send(err.body)
});

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
    console.log('error 404', req.url, 'not found');

    var error = new Error();
    error.status = 404;
    next(error);
});

module.exports = app;
