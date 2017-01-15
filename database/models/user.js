/**
 * Created by ciane on 07/01/2017.
 */

const mongoose = require('mongoose');

module.exports = {
    ModelName: 'User',
    Model: {
        email: 'email',
        password: 'password'
    },
    Schema: new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: true,
            required: true
        }
    }, {
        versionKey: false
    })
};