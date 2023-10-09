const {fileService} = require('../services');

module.exports = {
    filesList: (req, res, next) => {
        const {user} = req;

        return fileService
            .getFiles(user.id)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    fileUpload: (req, res, next) => {
        const {body: {file, message}, user} = req;

        return fileService
            .uploadFile(user.id, message, file)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    fileDownload: (req, res, next) => {
        const {query: {fileId, discussionId}, user} = req;

        return fileService
            .downloadFile(user.id, fileId, discussionId)
            .then(filePath => res.sendFile(filePath))
            .catch(e => {next(e)});
    },
    fileRemove: (req, res, next) => {
        const {body: {fileId}, user} = req;

        return fileService
            .removeFile(user.id, fileId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
};
