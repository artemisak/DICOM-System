const {UserModel} = require('../models');
const {ApiError, hashStr, compareHashStr, errorMessages} = require('../utils');

module.exports = {
    register: async (username, password) => {
        const userExist = await UserModel.findOne({username});
        if (userExist) throw ApiError.BadRequest(errorMessages.user_exist);
        const user = await UserModel.create({username, password: hashStr(password)})
        return {id: user._id, username: user.username};
    },
    login: async (username, password) => {
        const user = await UserModel.findOne({username});
        if (!user) throw ApiError.BadRequest(errorMessages.wrong_data);
        const isPassEquals = compareHashStr(password, user.password)
        if (!isPassEquals) throw ApiError.BadRequest(errorMessages.wrong_pass);
        return {id: user._id, username: user.username};
    }
}