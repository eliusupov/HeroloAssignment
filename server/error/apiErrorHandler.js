const ApiError = require('./ApiError');

function apiErrorHandler(err, req, res, next) {
	if (err instanceof ApiError) {
		return res.status(err.status).json(err.message);
	}

	return res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;
