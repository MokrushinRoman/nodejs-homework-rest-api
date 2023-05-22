const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const typesList = ['mobile', 'home'];

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'mobile',
            enum: typesList,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const contactAddSchema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typesList),
});
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
const schemas = { contactAddSchema, updateFavoriteSchema };

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
