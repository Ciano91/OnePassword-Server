/**
 * Created by ciane on 07/01/2017.
 */
const assert = require("assert");
const mongoose = require('mongoose');
const User = require('./models/user');
const Token = require('./models/token');
const Website = require('./models/website');

const Params = {
    user: 'ciano',
    pwd: 'c14n0',
    dbName: 'one_password'
};

// UbWkMB2ypPd9

// const dbConnection = "mongodb://" + Params.user + ":" + Params.pwd + "@ds157268.mlab.com:57268/" + Params.dbName;
const dbConnection = "mongodb://" + Params.user + ":" + Params.pwd + "@localhost:27017/" + Params.dbName;

// promises
mongoose.Promise = Promise;

// connect
mongoose.connect(dbConnection);
const db = mongoose.connection;

db.on('error', () => {
    console.log('MongoDB connection error');
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// close connection on node process kill
process.on('SIGINT', function() {
    db.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {
    User: mongoose.model(User.ModelName, User.Schema),
    Token: mongoose.model(Token.ModelName, Token.Schema),
    Website: mongoose.model(Website.ModelName, Website.Schema)
};