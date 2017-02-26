/**
 * Created by ciane on 15/01/2017.
 */

const mongoose = require('mongoose');
const User = require('./user');

let Schema = new mongoose.Schema({
    home: {
        type: String,
        required: true
    },
    loginData: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.ModelName,
        required: true
    }
}, {
    versionKey: false
});

Schema.index({
    home: 1,
    user: 1
}, {
    unique: true
});

module.exports = {
    ModelName: 'Website',
    Model: {
        id: '_id',
        home: 'home',
        icon: 'icon',
        user: 'user',
        loginData: 'loginData',
        iv: 'iv'
    },
    Schema: Schema
};