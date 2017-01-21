/**
 * Created by ciane on 14/01/2017.
 */

const mongoose = require('mongoose');
const Website = require('./website');
const User = require('./user');

module.exports = {
    ModelName: 'Pin',
    Model: {
        pinSize: 5,
        pinValidTime: 60, // seconds
        pin: 'pin',
        user: 'user',
        website: 'website',
        createdAt: 'createdAt'
    },
    Schema: new mongoose.Schema({
        pin: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User.ModelName,
            required: true
        },
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Website.ModelName,
            unique: true
        },
        createdAt: {
            type: Number,
            default: new Date().getTime()
        }
    }, {
        versionKey: false
    })
};