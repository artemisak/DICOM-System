const {ApiError} = require('../utils/api_error')

const exceptionMiddleware = (err, req, res, next) => {
    console.log('Error', err.message);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    return res.status(500);
}

module.exports = {exceptionMiddleware}