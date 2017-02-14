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
        const stringToken = crypto.randomBytes(Token.Model.tokenSize).toString('hex');

        let token = {};
        token[Token.Model.token] = stringToken;
        token[Token.Model.user] = user;
        token[Token.Model.createdAt] = new Date().getTime();

        return db.Token.create(token);
    }

};
