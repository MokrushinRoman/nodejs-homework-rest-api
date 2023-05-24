const Joi = require('joi');
const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../helpers');

// const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

// MONGOOSE
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

// JOI
const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});
const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
});
const schemas = { userLoginSchema, userRegisterSchema };

module.exports = { schemas, User };
