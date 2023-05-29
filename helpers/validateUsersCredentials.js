const bcryptjs = require('bcryptjs');

const HttpError = require('./HttpError');

const validateUsersCredentials = async (user, password) => {
    if (!user) throw HttpError(401, 'Email or password is invalid');

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) throw HttpError(401, 'Email or password is invalid');
};

module.exports = validateUsersCredentials;
