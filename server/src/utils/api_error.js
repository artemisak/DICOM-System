class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError () {
        return new ApiError(401);
    }

    static BadRequest (message) {
        return new ApiError(400, message);
    }
}

module.exports = {ApiError}