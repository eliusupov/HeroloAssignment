const yup = require('yup');

exports.validateMessageSend = yup.object().shape({
	fromId: yup.string().required().trim(),
	toId: yup.string().required().trim(),
	message: yup.string().required().trim(),
	subject: yup.string().required().trim(),
});

