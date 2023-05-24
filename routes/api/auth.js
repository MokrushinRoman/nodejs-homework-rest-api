const router = require('express').Router();

const { registration, login } = require('../../controllers/auth');
const { validateWrapper } = require('../../decorators');
const {
    schemas: { userLoginSchema, userRegisterSchema },
} = require('../../models/user');

router.post('/register', validateWrapper(userRegisterSchema), registration);
router.post('/login', validateWrapper(userLoginSchema), login);

module.exports = router;
