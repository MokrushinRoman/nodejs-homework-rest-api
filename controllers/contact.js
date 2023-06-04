const { Contact } = require('../models/contact');
const { validateById } = require('../helpers');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const unwantedValues = '-updatedAt -createdAt';

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner }, unwantedValues, {
        skip,
        limit,
    }).populate('owner', 'name email');
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const searchedContact = await Contact.findById(contactId, unwantedValues);
    validateById(searchedContact);
    res.json(searchedContact);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        {
            new: true,
        }
    );
    validateById(updatedContact);
    res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        { new: true }
    );
    validateById(updatedContact);
    res.json(updatedContact);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    validateById(deletedContact);
    res.status(204).send();
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteContact: ctrlWrapper(deleteContact),
};
