const { Contact } = require('../models/contact');
const { validateContact } = require('../helpers');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const unwantedValues = '-updatedAt -createdAt';

const getAllContacts = async (_, res) => {
    const contacts = await Contact.find({}, unwantedValues);
    res.json(contacts);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const searchedContact = await Contact.findById(contactId, unwantedValues);
    validateContact(searchedContact);
    res.json(searchedContact);
};

const addContact = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        { new: true }
    );
    validateContact(updatedContact);
    res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        { new: true }
    );
    validateContact(updatedContact);
    res.json(updatedContact);
};

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    validateContact(deletedContact);
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
