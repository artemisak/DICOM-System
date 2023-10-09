const {fileStorage} = require('../utils');
const {FileModel, ResearchModel, AccessModel, CommentModel, DiscussionModel} = require('../models');

const accessCheck = async ({userId, fileId, researchId, discussionId}) => {
    if (discussionId) {
        const access = await AccessModel.exists({
            user: userId, discussion: discussionId, permission: {$lte: 1}
        })
        if (!access) return false;
    } else {
        if (!fileId && !researchId) return false;
        if (fileId) {
            const file = await FileModel.findById(fileId);
            if (!file?.owner?.equals(userId)) return false;
        }
        if (researchId) {
            const research = await ResearchModel.findById(researchId);
            if (!research?.author?.equals(userId)) return false;
        }
    }
    return true;
};

const deleteAccess = async(id) => {
    await AccessModel.findByIdAndDelete(id, {useFindAndModify: false});
}

const deleteComment = async(id) => {
    await CommentModel.findByIdAndDelete(id, {useFindAndModify: false});
}

const deleteResearch = async(id) => {
    await ResearchModel.findByIdAndDelete(id, {useFindAndModify: false});
}

const deleteDiscussion = async(id) => {
    const discussion = await DiscussionModel.findById(id);
    if (discussion?._id) {
        const comments = await CommentModel.find({discussion: discussion._id});
        const researches = await ResearchModel.find({discussion: discussion._id});
        const accesses = await AccessModel.find({discussion: discussion._id});
        if (comments) comments.map(comment => deleteComment(comment._id));
        if (researches) researches.map(research => deleteResearch(research._id));
        if (accesses) accesses.map(access => deleteAccess(access._id));

        await DiscussionModel.findByIdAndDelete(id, {useFindAndModify: false});
    }
}

const deleteFile = async(id) => {
    const file = await FileModel.findById(id);
    if (file?._id) {
        const researches = await ResearchModel.find({file: file._id});
        if (researches) researches.map(research => deleteResearch(research._id));
        const discussions = await DiscussionModel.find({file: file._id});
        if (discussions) discussions.map(discussion => deleteDiscussion(discussion._id));

        fileStorage.removeFile(id);
        await FileModel.findByIdAndDelete(id, {useFindAndModify: false});
    }
}

module.exports = {
    accessCheck,
    deleteAccess,
    deleteComment,
    deleteResearch,
    deleteDiscussion,
    deleteFile
}
