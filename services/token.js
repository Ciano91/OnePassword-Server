/**
 * Created by ciane on 14/01/2017.
 */

const db = require('../database/db');
const crypto = require('crypto');
const Token = require('../database/models/token');

module.exports = {

    newToken: (user) => {

        // new token
        const token = crypto.randomBytes(Token.Model.tokenSize).toString('hex');

        return db.Token.findOneAndUpdate(
            {
                'user._id': user._id
            }, {
                'token': token,
                'createdAt': Date.now()
            }, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            });

    }

};
