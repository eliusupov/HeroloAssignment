class ApiError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static unAuthorised(msg) {
        return new ApiError(401, msg);
    }
}

module.exports = ApiError;