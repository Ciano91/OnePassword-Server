/**
 * Created by ciane on 21/01/2017.
 */

const express = require('express');
const router = express.Router();
const Pin = require('../database/models/pin');
const PinService = require('../services/pin');
const PinErrors = require('../errors/pin');

// generate a registration pin
router.route('/registration').get((req, res, next) => {

    PinService.generateRegistrationPin(req.user)
        .then((pin) => {

            // send new registration pin
            res.format({
                json: () => {
                    res.json({
                        registration_pin: pin[Pin.Model.pin]
                    })
                }
            });

        });

});

// generate a login pin
router.route('/login/:id').get((req, res, next) => {

    const websiteId = req.params.id;

    PinService.generateLoginPin(req.user, websiteId)
        .then((pin) => {

            // send new login pin
            res.format({
                json: () => {
                    res.json({
                        login_pin: pin[Pin.Model.pin]
                    })
                }
            });

        })
        .catch((err) => {
            return next(err)
        })

});

module.exports = router;