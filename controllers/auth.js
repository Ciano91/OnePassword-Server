/**
 * Created by ciane on 07/01/2017.
 */

const express = require('express');
const router = express.Router();
const sha = require('sha1');
const User = require('../database/models/user');
const AuthService = require('../services/auth');
const AuthErrors = require('../errors/auth');
const GeneralErrors = require('../errors/general');

// login
router.route('/login').post((req, res, next) => {
    const body = req.body;
    let email = body[User.Model.email];
    let password = body[User.Model.password];

    // check data
    if (!(email && password)) {
        return next(GeneralErrors.InvalidParams);
    }

    email = email.trim();
    password = password.trim();

    if (email.length == 0 || password.length == 0) {
        return next(GeneralErrors.InvalidParams);
    }

    AuthService.login(email, sha(password))
        .then((token) => {

            // login failed
            if (token == null) {
                return next(AuthErrors.LoginFailed);
            }

            // send token
            res.format({
                json: () => {
                    res.json({
                        token: token.token
                    })
                }
            });

        })
        .catch((err) => {
            return next(AuthErrors.LoginFailed);
        });

});

// logout
router.route('/logout').get((req, res, next) => {
    AuthService.logout(req.user)
        .then(() => {
            res.json({});
        });
});

// register a user
router.route('/register').post((req, res, next) => {
    const body = req.body;
    let email = body[User.Model.email];
    let password = body[User.Model.password];

    // check params
    if (!(email && password)) {
        return next(GeneralErrors.InvalidParams);
    }

    email = email.trim();
    password = password.trim();

    if (email.length == 0 || password.length == 0) {
        return next(GeneralErrors.InvalidParams);
    }

    let user = {};
    user[User.Model.email] = email;
    user[User.Model.password] = sha(password);

    AuthService.register(user)
        .then((token) => {

            // registration failed
            if (token == null) {
                return next(AuthErrors.UserAlreadyRegistered);
            }

            // send token
            res.format({
                json: () => {
                    res.json({
                        token: token.token
                    })
                }
            });

        })
        .catch((err) => {

            // duplicate fields error
            if (err.code == 11000) {
                return next(AuthErrors.UserAlreadyRegistered);
            } else {

                // general error
                return next(AuthErrors.RegistrationFailed);
            }

        });

});

module.exports = router;