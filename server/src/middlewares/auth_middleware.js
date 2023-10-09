const {ApiError} = require('../utils');
const {validateToken} = require('../utils')

const secretKey = process.env.JWT_ACCESS_SECRET;

const getDataFromCookie = (cookie) => {
    return cookie.split(';').reduce((res, item) => {
        const data = item.trim().split('=');
        return { ...res, [data[0]]: data[1] };
    }, {});
}

const authMiddleware = (req, res, next) => {
   try {
       const {cookie} = req.headers;
       const token = getDataFromCookie(cookie).auth;
       if (!token) next(ApiError.UnauthorizedError());
       const userData = validateToken(token, secretKey);
       if (!userData) next(ApiError.UnauthorizedError());
       req.user = userData;

       next();
   } catch (e) {
       next(ApiError.UnauthorizedError())
   }
}

module.exports = {authMiddleware}