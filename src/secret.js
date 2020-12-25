// generate and cache a secret. this prevents invalidated sessions on server
// restart.

const crypto = require('crypto');
const fs = require('fs');

const file = __dirname + '/../.cookie-secret';
let secret;

try {
    secret = fs.readFileSync(file, 'utf8');
} catch (e) {
    secret = crypto.randomBytes(128).toString();
    fs.writeFileSync(file, secret);
}

module.exports = secret;
