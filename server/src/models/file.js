const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;

const fileSchema = new Schema(
    {
        owner: {
            type: ObjectId,
            ref: 'users',
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

const FileModel = model('files', fileSchema);

module.exports = FileModel;