const express = require("express");

const {authMiddleware} = require('./middlewares');

const {userController, fileController, researchController, discussionController} = require("./controllers");

const authRouter = express.Router()
    .post('/login', userController.login)
    .post('/logout', userController.logout)
    .post('/register', userController.register)

const fileRouter = express.Router()
    .use(authMiddleware)
    .get('/list', fileController.filesList)
    .get('/', fileController.fileDownload)
    .post('/', fileController.fileUpload)
    .delete('/', fileController.fileRemove)

const researchRouter = express.Router()
    .use(authMiddleware)
    .get('/list', researchController.researchesList)
    .get('/', researchController.researchDownload)
    .post('/', researchController.researchUpload)
    .delete('/', researchController.researchRemove)

const discussionRouter = express.Router()
    .use(authMiddleware)
    .get('/list', discussionController.discussionsList)
    .get('/comments', discussionController.discussionCommentsList)
    .get('/accesses', discussionController.discussionAccessesList)
    .post('/create', discussionController.discussionCreate)
    .post('/join', discussionController.discussionJoin)
    .post('/leave', discussionController.discussionLeave)
    .post('/comment', discussionController.discussionAddComment)
    .post('/accesses', discussionController.discussionAccessesUpdate)
    .delete('/', discussionController.discussionRemove)
    .delete('/comment', discussionController.discussionCommentRemove)

module.exports = {
    authRouter,
    fileRouter,
    researchRouter,
    discussionRouter
};