const express = require('express');
const router = express.Router();

const { validateWrapper, isValidId } = require('../../decorators');
const {
    schemas: { contactAddSchema, updateFavoriteSchema },
} = require('../../models/contact');
const {
    getAllContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact,
    updateFavorite,
} = require('../../controllers/contact');

router.get('/', getAllContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateWrapper(contactAddSchema), addContact);
router.put(
    '/:contactId',
    isValidId,
    validateWrapper(contactAddSchema),
    updateContact
);
router.patch(
    '/:contactId/favorite',
    isValidId,
    validateWrapper(updateFavoriteSchema),
    updateFavorite
);
router.delete('/:contactId', isValidId, deleteContact);

module.exports = router;
