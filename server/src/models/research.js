const {Schema, model} = require('mongoose');
const {Types: {ObjectId, Mixed}} = Schema;

const researchSchema = new Schema(
    {
        author: {
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
        },
        discussion: {
            type: ObjectId,
            ref: 'discussions'
        },
        data: {
            type: Mixed,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

const ResearchModel = model('research', researchSchema);

module.exports = ResearchModel;