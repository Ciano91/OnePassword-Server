/**
 * Created by ciane on 08/01/2017.
 */

const error = require('./error');

module.exports = {

    // general
    InvalidParams: error(500, 'invalid_params'),

    // registration
    RegistrationFailed: error(500, 'registration_failed'),
    UserAlreadyRegistered: error(500, 'user_already_registered'),

    // login
    LoginFailed: error(500, 'login_failed')

};