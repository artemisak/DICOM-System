const {FileModel} = require('../models');
const {fileStorage, ApiError, errorMessages} = require('../utils');
const {accessCheck, deleteFile} = require('./common_service');

const uploadFile = async (userId, fileName, fileData) => {
    const newFile = await FileModel.create({owner: userId, title: fileName})
    fileStorage.saveDicom(newFile._id, fileData);

    return {id: newFile._id};
};

const getFiles = async (userId) => {
    const files = await FileModel
        .find({owner: userId})
        .sort({updatedAt: -1})
        .populate('owner');

    return files?.map(({_id, title, createdAt, owner}) => ({
        id: _id, title, date: createdAt, userName: owner?.username, userId: owner?._id
    })) || [];
};

const downloadFile = async (userId, fileId, discussionId) => {
    const access = await accessCheck({userId, fileId, discussionId});
    if (!access) throw ApiError.BadRequest(errorMessages.access_denied);

    return fileStorage.getDicomPath(fileId);
};

const removeFile = async (userId, fileId) => {
    const file = await FileModel.findById(fileId);
    if (!file || !file?.owner?.equals(userId)) throw ApiError.BadRequest(errorMessages.access_denied);
    await deleteFile(fileId);

    return {};
}

module.exports = {
    uploadFile,
    getFiles,
    downloadFile,
    removeFile
}
