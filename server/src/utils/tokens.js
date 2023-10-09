const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_ACCESS_SECRET;
const expiresIn = '365d';

module.exports = {
    generateToken: (payload) => jwt.sign(payload, secretKey, {expiresIn}),
    validateToken: (token) => jwt.verify(token, secretKey, (err, decoded) => err ? null : decoded)
}
