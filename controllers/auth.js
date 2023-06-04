const bcryptjs = require('bcryptjs');

const ctrlWrapper = require('../decorators/ctrlWrapper');
const { User } = require('../models/user');
const {
    validateUsersCredentials,
    isRegistredUser,
    generateJWT,
} = require('../helpers');

const unwantedValues = '-updatedAt -createdAt';

const registration = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    isRegistredUser(user);

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    const token = generateJWT(newUser);
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        token,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, unwantedValues);
    await validateUsersCredentials(user, password);

    const token = generateJWT(user);
    await User.findByIdAndUpdate(user._id, { token });

    res.json({ token });
};
const logOut = async (req, res) => {
    const { token } = req.user;
    const user = await User.findOneAndUpdate(
        { token },
        { token: '' },
        { new: true }
    );

    res.json({ user });
};
const getCurrent = (req, res) => {
    const { email, name } = req.user;

    res.json({ name, email });
};

module.exports = {
    registration: ctrlWrapper(registration),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logOut: ctrlWrapper(logOut),
};
