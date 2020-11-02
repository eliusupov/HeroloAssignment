const yup = require('yup');

exports.validateUserCreate = yup.object().shape({
	email: yup.string().email().required().trim(),
	password: yup.string().trim().min(5).max(12).required(),
});

exports.validateUserLogin = yup.object().shape({
	email: yup.string().email().required().trim(),
	password: yup.string().trim().min(5).max(12).required(),
});

exports.validateUserCheckEmail = yup.object().shape({
	email: yup.string().email().required().trim(),
});
