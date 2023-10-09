const {userService} = require('../services')

const {generateToken, successMessages} = require('../utils');

module.exports = {
    login: (req, res, next) => {
        const {username, password} = req.body;
        return userService
            .login(username, password)
            .then((user) => {
                const {id, username} = user;
                res.cookie('auth', generateToken({id, username}), {httpOnly: true});
                return res.send({id, message: successMessages.user_logged});
            })
            .catch(e => {next(e)});
    },
    register: (req, res, next) => {
        const {username, password} = req.body;
        return userService
            .register(username, password)
            .then((user) => {
                const {id, username} = user;
                res.cookie('auth', generateToken({id, username}), {httpOnly: true});
                return res.send({id, message: successMessages.user_created});
            })
            .catch(e => {next(e)});
    },
    logout: (req, res, next) => {
        res.clearCookie('auth');
        return res.sendStatus(200);
    }
};