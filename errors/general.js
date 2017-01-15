/**
 * Created by ciane on 15/01/2017.
 */

const error = require('./error');

module.exports = {
    JsonSyntax: error(500, 'json_syntax_error'),
    EmptyBody: error(500, 'empty_body'),
    InvalidParams: error(500, 'invalid_params'),
    NoAuthorization: error(401, 'no_authorization'),
    InvalidToken: error(401, 'invalid_token')
};