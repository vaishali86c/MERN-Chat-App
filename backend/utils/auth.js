// jwt token for authentication and authorization

const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
    // include any user imformation you want in the token payload
    const payload = { userId: user._id, username: user.username };
    // use a secret key for singin the token
    // set the token expiration time(eg. 1hr)
    const expiresIn = '1h';

    return jwt.sign(payload, secretKey, {expiresIn});
};

const verifyToken = (token) => {
    try {
        
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
