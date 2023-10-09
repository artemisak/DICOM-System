const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;

const accessSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: 'users',
            required: true
        },
        discussion: {
            type: ObjectId,
            ref: 'discussions',
            required: true
        },
        permission: {
            type: Number,
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

module.exports = model('accesses', accessSchema);
