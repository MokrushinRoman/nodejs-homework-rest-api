const ctrlWrapper = require('../decorators/ctrlWrapper');
// const { validateId } = require('../helpers');
const { User } = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validateUser } = require('../helpers');

const unwantedValues = '-updatedAt -createdAt';

const registration = async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, unwantedValues);
    validateUser(user);
    console.log(user.password);
    console.log(password);
    const isValidPassword = await bcryptjs.compare(password, user.password);
    console.log(isValidPassword);
    res.send();
};

module.exports = {
    registration: ctrlWrapper(registration),
    login: ctrlWrapper(login),
};
