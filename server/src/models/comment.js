const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;

const commentSchema = new Schema(
    {
        author: {
            type: ObjectId,
            ref: 'users',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        discussion: {
            type: ObjectId,
            ref: 'discussions',
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

module.exports = model('comments', commentSchema);
