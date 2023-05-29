const HttpError = require('./HttpError');

const isRegistredUser = user => {
    if (user) throw HttpError(409, 'Email is already in use');
};

module.exports = isRegistredUser;
