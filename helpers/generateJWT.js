const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const generateJWT = user => {
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    return token;
};

module.exports = generateJWT;
