/**
 * Created by ciane on 10/01/2017.
 */

const db = require('../database/db');
const TokenService = require('./token');
const User = require('../database/models/user');

module.exports = {

    login: (email, password) => {
        let user = {};
        user[User.Model.email] = email;
        user[User.Model.password] = password;
        return db.User.findOne({
            email: email,
            password: password
        })
            .then((user) => {
                return TokenService.newToken(user);
            })
    },

    register: (user) => {
        return db.User.create(user)
            .then((user) => {
                return TokenService.newToken(user)
                    .then((token) => {
                        return token;
                    })
            })
    }

};