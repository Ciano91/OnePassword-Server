/**
 * Created by ciane on 15/01/2017.
 */

const db = require('../database/db');
const Website = require('../database/models/website');
const PinService = require('../services/pin');
const PinErrors = require('../errors/pin');
const Crypto = require('../utils/Crypto');

module.exports = {

    // add a website to a specific user
    add: (website, pin) => {

        // check the token
        return PinService.checkRegistrationPin(website[Website.Model.user], pin)
            .then((pin) => {
                if (pin == null) {
                    throw PinErrors.InvalidRegistrationPin;
                } else {
                    return db.User.findOne({
                        _id: website[Website.Model.user]
                    }).then((user) => {
                        let key = user.password;

                        let encrypt = Crypto.Aes.encrypt(website[Website.Model.loginData], key);
                        website[Website.Model.loginData] = encrypt.encryptedData;
                        website[Website.Model.iv] = encrypt.iv;

                        return db.Website.create(website);
                    });
                }
            });
    },

    // list all websites for a specific user
    list: (userId) => {
        let query = {};
        query[Website.Model.user] = userId;

        const fields = Website.Model.home + " " + Website.Model.icon;

        return db.Website.find(query, fields);
    },

    // get the login data for a website
    login: (pin) => {

        return PinService.checkLoginPin(pin)
            .then((pin) => {

                if (pin == null) {
                    throw PinErrors.InvalidLoginPin;
                } else {

                    return db.User.findOne({
                        _id: pin.website[Website.Model.user]
                    }).then((user) => {
                        let key = user.password;
                        let iv = pin.website[Website.Model.iv];

                        pin.website[Website.Model.loginData] = Crypto.Aes.decrypt(pin.website[Website.Model.loginData], key, iv);
                        return pin.website;
                    });

                }

            })

    },

    // remove a website from a specific user
    remove: (websiteId, userId) => {
        return db.Website.findOneAndRemove({
            _id: websiteId,
            user: userId
        })
    }

};