const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

userSchema.statics.getUserByLogin = (username, callback) => {
    UserModel.findOne({username}, callback)
}

const UserModel = model('users', userSchema);


module.exports = UserModel;
