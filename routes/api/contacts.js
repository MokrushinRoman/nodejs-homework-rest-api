const express = require('express');
const router = express.Router();

const {
    authentificate,
    validateBody,
    isValidId,
} = require('../../middlewares');
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

router.use(authentificate);

router.get('/', getAllContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(contactAddSchema), addContact);
router.put(
    '/:contactId',
    isValidId,
    validateBody(contactAddSchema),
    updateContact
);
router.patch(
    '/:contactId/favorite',
    isValidId,
    validateBody(updateFavoriteSchema),
    updateFavorite
);
router.delete('/:contactId', isValidId, deleteContact);

module.exports = router;
