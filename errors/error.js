/**
 * Created by ciane on 10/01/2017.
 */

function error(code, msg) {
    let err = new Error();
    err.status = code;
    err.body = {
        error: msg
    };
    return err;
}

module.exports = error;