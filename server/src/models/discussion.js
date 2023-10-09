const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;

const discussionSchema = new Schema(
    {
        creator: {
            type: ObjectId,
            ref: 'users',
            required: true
        },
        file: {
            type: ObjectId,
            ref: 'files',
            required: true
        },
        title: {
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

module.exports = model('discussions', discussionSchema);