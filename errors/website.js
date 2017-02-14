/**
 * Created by ciane on 15/01/2017.
 */

const error = require('./error');

module.exports = {

    // add
    WebsiteAlreadyRegistered: error(500, 'website_already_registered'),

    // not registered
    WebsiteNotRegistered: error(500, 'website_not_registered')

};