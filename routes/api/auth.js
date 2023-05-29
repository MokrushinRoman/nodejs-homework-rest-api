const router = require('express').Router();

const {
    registration,
    login,
    getCurrent,
    logOut,
} = require('../../controllers/auth');
const { validateBody, authentificate } = require('../../middlewares');
const {
    schemas: { userLoginSchema, userRegisterSchema },
} = require('../../models/user');

router.post('/register', validateBody(userRegisterSchema), registration);
router.post('/login', validateBody(userLoginSchema), login);
router.post('/logout', authentificate, logOut);
router.get('/current', authentificate, getCurrent);

module.exports = router;
