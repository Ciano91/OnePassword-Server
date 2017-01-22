/**
 * Created by ciane on 14/01/2017.
 */

const db = require('../database/db');
const Pin = require('../database/models/pin');
const WebsiteErrors = require('../errors/website');
const crypto = require('crypto');

module.exports = {

    // check a pin for website registration
    checkRegistrationPin: (user, pin) => {

        let find = {};
        find[Pin.Model.user] = user;
        find[Pin.Model.pin] = pin;
        find[Pin.Model.website] = null;
        find[Pin.Model.createdAt] = {
            $gte: new Date().getTime() - (Pin.Model.pinValidTime * 1000)
        };

        return db.Pin.findOneAndRemove(find);
    },

    // check a pin for login in a website
    checkLoginPin: (user, pin) => {

        let find = {};
        find[Pin.Model.pin] = pin;
        find[Pin.Model.user] = user;
        find[Pin.Model.createdAt] = {
            $gte: new Date().getTime() - (Pin.Model.pinValidTime * 1000)
        };

        return db.Pin.findOneAndRemove(find).populate(Pin.Model.website);
    },

    // generate a login pin
    generateLoginPin: (user, websiteId) => {

        // check if website is registered
        return db.Website.findOne({
            _id: websiteId,
            user: user
        })
            .then((website) => {

                // website not registered
                if (website == null) {
                    throw WebsiteErrors.WebsiteNotRegistered;
                }

                // looking for the user
                let find = {};
                find[Pin.Model.user] = user;
                find[Pin.Model.website] = websiteId;

                // new pin
                let update = {};
                update[Pin.Model.pin] = crypto.randomBytes(Pin.Model.pinSize).toString('hex');
                update[Pin.Model.createdAt] = new Date().getTime();

                const options = {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                };

                return db.Pin.findOneAndUpdate(find, update, options);

        })

    },

    // generate a registration pin for a user
    generateRegistrationPin: (userId) => {

        // looking for the user
        let find = {};
        find[Pin.Model.user] = userId;
        find[Pin.Model.website] = null;

        // new pin
        let update = {};
        update[Pin.Model.pin] = crypto.randomBytes(Pin.Model.pinSize).toString('hex');
        update[Pin.Model.createdAt] = new Date().getTime();

        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };

        return db.Pin.findOneAndUpdate(find, update, options);

    }

};
