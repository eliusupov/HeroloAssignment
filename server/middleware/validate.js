const ApiError = require('../error/ApiError');

function validate(schema) {
	return async (req, res, next) => {
		try {
			const validated = await schema.validate(req.body);
			req.body = validated;
			next();
		} catch (err) {
			ApiError.badRequest(err);
		}
	};
}

module.exports = validate;
