const {researchService} = require('../services');

module.exports = {
    researchesList: (req, res, next) => {
        const {query: {fileId, discussionId}, user} = req;

        return researchService
            .getResearches(user.id, fileId, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    researchUpload: (req, res, next) => {
        const {body: {research, message, fileId, discussionId}, user} = req;

        return researchService
            .uploadResearch(user.id, message, research, fileId, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    researchDownload: (req, res, next) => {
        const {query: {researchId, discussionId}, user} = req;

        return researchService
            .downloadResearch(user.id, researchId, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    researchRemove: (req, res, next) => {
        const {body: {researchId}, user} = req;

        return researchService
            .removeResearch(user.id, researchId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    }
};
