const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const user = require('../controllers/UserController');
const validate = require('../middleware/validate');
const userValidation = require('../validation/userValidation');

router.post('/login', validate(userValidation.validateUserLogin), user.userLogin);
router.put('/create', validate(userValidation.validateUserCreate), user.userCreate);
router.post('/checkEmail', validate(userValidation.validateUserCheckEmail), user.userCheckEmailAvail);
router.get('/recipients', auth, user.userGetRecipients);

module.exports = router;
