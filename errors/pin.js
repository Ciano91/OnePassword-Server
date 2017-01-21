/**
 * Created by ciane on 15/01/2017.
 */

const error = require('./error');

module.exports = {
    InvalidRegistrationPin: error(500, 'invalid_registration_pin'),
    InvalidLoginPin: error(500, 'invalid_login_pin')
};