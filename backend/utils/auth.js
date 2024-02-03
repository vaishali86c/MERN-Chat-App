// jwt token for authentication and authorization

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    // include any user imformation you want in the token payload
    const payload = { userId: user._id, username: user.username };
    // use a secret key for singin the token
    const secretKey = 'your-secrte-key';
    // set the token expiration time(eg. 1hr)
    const expiresIn = '1h';

    return jwt.sign(payload, secretKey, {expiresIn});
};

const verifyToken = (token) => {
    try {
        const secretKey = 'your-secret-key';
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
