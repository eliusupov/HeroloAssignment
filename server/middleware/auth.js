const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = (req, res, next) => {
	const token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : '';
	let decodedToken;

	try {
		decodedToken = jwt.verify(token, 'secret');
	} catch (err) {
		return next(err)
	}

	if (!decodedToken) {
		return ApiError.unAuthorised('invalid token')
	}
	req.userId = decodedToken.userId;
	next();
};
