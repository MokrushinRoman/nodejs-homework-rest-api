const handleMongooseError = (error, data, next) => {
    const { name, code } = error;
    const isConflict = name === 'MongoServerError' && code === 11000;
    if (isConflict) {
        error.status = 409;
        error.message = 'User with such email has been already registred';
        next();
        return;
    }
    error.status = 400;
    next();
};

module.exports = handleMongooseError;
