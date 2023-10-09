const {DiscussionModel, AccessModel, CommentModel, FileModel, UserModel} = require('../models');
const {ApiError, errorMessages} = require('../utils')
const {accessCheck, deleteComment, deleteDiscussion, deleteAccess} =require('./common_service');

const getDiscussions = async (userId) => {
    const accesses = await AccessModel
        .find({user: userId, permission: {$lte: 1}})
        .sort({updatedAt: -1})
        .populate([{
            path: 'discussion',
            populate: {
                path: 'creator',
                model: UserModel
            }
        }])

    return accesses.map(access => {
        const {discussion, permission} = access;
        const {_id, creator, file, title, createdAt} = discussion;
        return {
            id: _id,
            userName: creator.username,
            userId: creator._id,
            fileId: file,
            date: createdAt,
            title,
            permission
        }
    })
};

const create = async (userId, fileId, title) => {
    const file = await FileModel.findById(fileId);
    if (file?.owner?.equals(userId)) {
        const newDiscussion = await DiscussionModel.create({creator: userId,file: fileId, title});
        await AccessModel.create({user: userId, discussion: newDiscussion._id, permission: 0});
        return {id: newDiscussion._id};
    } else {
        throw ApiError.BadRequest();
    }
};

const join = async (userId, discussionId) => {
    const hasAccess = await AccessModel.findOne({user: userId, discussion: discussionId});
    if (hasAccess) return {id: hasAccess._id};
    const newAccess = await AccessModel.create({user: userId, discussion: discussionId, permission: 2});
    return {id: newAccess._id};
};

const leave = async (userId, discussionId) => {
    const deletedAccess = await AccessModel.deleteOne({user: userId, discussion: discussionId});
    return {id: deletedAccess._id};
};

const getComments = async (userId, discussionId) => {
    const access = await accessCheck({userId, discussionId});
    if (!access) throw ApiError.BadRequest(errorMessages.access_denied);

    const commentsList = await CommentModel
        .find({discussion: discussionId})
        .sort({updatedAt: -1})
        .populate('author')

    return commentsList.map(({_id, author, text, createdAt}) => ({
        id: _id,
        userId: author._id,
        userName: author.username,
        text,
        date: createdAt
    }));
};

const addComment = async (userId, discussionId, text) => {
    const access = await accessCheck({userId, discussionId});
    if (!access) throw ApiError.BadRequest(errorMessages.access_denied);
    const newComment = await CommentModel.create({author: userId, discussion: discussionId, text})
    return {id: newComment._id};
};

const getAccesses = async (userId, discussionId) => {
    const access = await accessCheck({userId, discussionId});
    if (!access) throw ApiError.BadRequest(errorMessages.access_denied);

    const accessesToDiscussion = await AccessModel
        .find({discussion: discussionId})
        .populate('user')

    return accessesToDiscussion.map(({_id, permission, user}) => ({
        id: _id, permission, userId: user._id, userName: user.username
    }));
};

const updateAccesses = async (userId, discussionId, allow, deny) => {
    const discussion = await DiscussionModel.findById(discussionId);
    if (!discussion || !discussion?.creator?.equals(userId)) throw ApiError.BadRequest(errorMessages.access_denied);

    if (allow) {
        for (let i = 0; i < allow?.length; i++) {
            await AccessModel.findByIdAndUpdate(allow[i], {permission: 1}, { new: true });
        }
    }
    if (deny) {
        for (let i = 0; i < deny?.length; i++) {
            await deleteAccess(deny[i])
        }
    }

    return {};
};

const removeDiscussion = async (userId, discussionId) => {
    const discussion = await DiscussionModel.findById(discussionId);
    if (!discussion || !discussion?.creator?.equals(userId)) throw ApiError.BadRequest(errorMessages.access_denied);
    await deleteDiscussion(discussionId);

    return {};
}

const removeComment = async (userId, commentId) => {
    const comment = await CommentModel.findById(commentId);
    if (!comment || !comment?.author?.equals(userId)) throw ApiError.BadRequest(errorMessages.access_denied);
    await deleteComment(commentId);

    return {};
}

module.exports = {
    getDiscussions,
    create,
    join,
    leave,
    getComments,
    addComment,
    getAccesses,
    updateAccesses,
    removeDiscussion,
    removeComment
}
