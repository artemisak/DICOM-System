const {discussionService} = require('../services');

module.exports = {
    discussionsList: (req, res, next) => {
        const {user} = req;
        return discussionService
            .getDiscussions(user.id)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionCreate: (req, res, next) => {
        const {body: {message, fileId}, user} = req;
        return discussionService
            .create(user.id, fileId, message)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionJoin: (req, res, next) => {
        const {body: {message}, user} = req;

        return discussionService
            .join(user.id, message)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionLeave: (req, res, next) => {
        const {body: {discussionId}, user} = req;

        return discussionService
            .leave(user.id, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionCommentsList: (req, res, next) => {
        const {query: {discussionId}, user} = req;

        return discussionService
            .getComments(user.id, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionAddComment: (req, res, next) => {
        const {body: {message, discussionId}, user} = req;

        return discussionService
            .addComment(user.id, discussionId, message)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionAccessesList: (req, res, next) => {
        const {query: {discussionId}, user} = req;

        return discussionService
            .getAccesses(user.id, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionAccessesUpdate: (req, res, next) => {
        const {body: {allow, deny, discussionId}, user} = req;

        return discussionService
            .updateAccesses(user.id, discussionId, allow, deny)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionRemove: (req, res, next) => {
        const {body: {discussionId}, user} = req;

        return discussionService
            .removeDiscussion(user.id, discussionId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
    discussionCommentRemove: (req, res, next) => {
        const {body: {commentId}, user} = req;

        return discussionService
            .removeComment(user.id, commentId)
            .then(data => res.send(data))
            .catch(e => {next(e)});
    },
};
