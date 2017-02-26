/**
 * Created by ciane on 21/02/2017.
 */

const crypto = require('crypto');

// AES crypt utils
let AesCrypt = {
    Config: {
        Algorithm: 'aes-256-cbc',
        InputEncoding: 'utf8',
        OutputEncoding: 'hex',
        StringEncoding: 'base64',
        IvSize: 16, // AES256 needs an IV with 16 chars
        KeySize: 32 // AES256 needs a key with 32 chars (32 * 8 = 256)
    }
};

AesCrypt._generateIv = () => {
    return crypto.randomBytes(AesCrypt.Config.IvSize / 2).toString('hex');
};

AesCrypt.decrypt = function(encryptdata, cryptkey, iv) {

    cryptkey = crypto.createHash('sha256').update(cryptkey).digest();

    encryptdata = new Buffer(encryptdata, 'base64').toString('binary');

    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv);

    let decoded = decipher.update(encryptdata, 'binary', 'utf8');
    decoded += decipher.final('utf8');

    return decoded;
};

AesCrypt.encrypt = function(cleardata, cryptkey) {

    const iv = AesCrypt._generateIv();

    cryptkey = crypto.createHash('sha256').update(cryptkey).digest();

    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv);
    let encryptdata  = encipher.update(cleardata, 'utf8', 'binary');
    encryptdata += encipher.final('binary');

    return {
        encryptedData: new Buffer(encryptdata, 'binary').toString('base64'),
        iv: iv
    };
};

module.exports = {
    Aes: AesCrypt
};