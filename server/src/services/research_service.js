const {ResearchModel} = require('../models');
const {ApiError, errorMessages} = require('../utils');
const {accessCheck, deleteResearch} =require('./common_service');

const uploadResearch = async (userId, fileName, fileData, fileId, discussionId) => {
    const newFile = await ResearchModel.create({
        author: userId, file: fileId, title: fileName, discussion: discussionId, data: fileData
    });

    return {id: newFile._id};
};

const getResearches = async (userId, fileId, discussionId = null) => {
    const access = await accessCheck({userId, fileId, discussionId});
    if (!access) throw ApiError.BadRequest(errorMessages.access_denied);

    const searchOptions = {file: fileId, discussion: discussionId}
    if (!discussionId) searchOptions.author = userId;

    const researches = await ResearchModel
        .find(searchOptions)
        .sort({updatedAt: -1})
        .populate('author');

    return researches.map(({_id, file, title, createdAt, author}) => ({
        id: _id, file, title, date: createdAt, userName: author.username, userId: author._id
    })) || [];
};

const downloadResearch = async (userId, researchId, discussionId) => {
    const access = await accessCheck({userId, researchId, discussionId});
    if (!access) throw ApiError.BadRequest(errorMessages.access_denied);

    const research = await ResearchModel.findById(researchId);

    return research?.data ? research.data : null;
};

const removeResearch = async (userId, researchId) => {
    const research = await ResearchModel.findById(researchId);
    if (!research || !research?.author?.equals(userId)) throw ApiError.BadRequest(errorMessages.access_denied);
    await deleteResearch(researchId);

    return {};
}

module.exports = {
    uploadResearch,
    getResearches,
    downloadResearch,
    removeResearch
}
