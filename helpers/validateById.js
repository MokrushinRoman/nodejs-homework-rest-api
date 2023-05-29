const HttpError = require('./HttpError');

const messages = {
    404: 'Contact with such id does not exist',
    401: 'User with such id does not exist',
};

const validateById = (contact, status = 404, message = messages[status]) => {
    if (!contact) throw HttpError(status, message);
};

module.exports = validateById;
