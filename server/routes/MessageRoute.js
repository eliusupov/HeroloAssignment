const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const message = require('../controllers/MessageController');
const validate = require('../middleware/validate');
const messageValidation = require('../validation/messageValidation');

router.get('/:id', auth, message.messagesGet);
router.put('/', auth, validate(messageValidation.validateMessageSend), message.messageSend);
router.delete('/:id', auth, message.messageDeleteById);

module.exports = router;
