const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const secretKey = generateRandomString(64);
console.log(`Generated Secret Key: ${secretKey}`);