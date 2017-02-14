/**
 * Created by ciane on 14/01/2017.
 */

const mongoose = require('mongoose');
const User = require('./user');

module.exports = {
    ModelName: 'Token',
    Model: {
        tokenSize: 16,
        token: 'token',
        user: 'user',
        createdAt: 'createdAt'
    },
    Schema: new mongoose.Schema({
        token: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User.ModelName,
            required: true
        },
        createdAt: {
            type: Number,
            default: new Date().getTime()
        }
    }, {
        versionKey: false
    })
};