/**
 * Created by ciane on 14/01/2017.
 */

const db = require('../database/db');
const crypto = require('crypto');
const Token = require('../database/models/token');

module.exports = {

    // check if token is valid
    checkToken: (token) => {
        return db.Token.findOne({
            token: token
        }).populate(Token.Model.user);
    },

    // create a new token for a user
    createToken: (user) => {

        // new token
        const token = crypto.randomBytes(Token.Model.tokenSize).toString('hex');

        let find = {};
        find[Token.Model.user] = user;

        let update = {};
        update[Token.Model.token] = token;

        const options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };

        return db.Token.findOneAndUpdate(find, update, options);
    }

};
