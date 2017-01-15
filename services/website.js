/**
 * Created by ciane on 15/01/2017.
 */

const db = require('../database/db');
const Website = require('../database/models/website');

module.exports = {

    // list all websites for a specific user
    list: (userId) => {
        let query = {};
        query[Website.Model.user] = userId;

        const fields = Website.Model.home + " " + Website.Model.icon;

        return db.Website.find(query, fields);
    },

    // add a website to a specific user
    add: (website, userId) => {
        website[Website.Model.user] = userId;
        return db.Website.create(website);
    },

    // remove a website from a specific user
    remove: (websiteId, userId) => {
        return db.Website.findOneAndRemove({
            _id: websiteId,
            user: userId
        })
    }

};