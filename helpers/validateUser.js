const HttpError = require('./HttpError');

const validateUser = credential => {
    if (!credential) throw HttpError(401, 'Email or password is invalid');
};

module.exports = validateUser;
