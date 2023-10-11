import axios from "axios";

const server = axios.create({
    baseURL: 'http://77.234.215.138:60374/',
    timeout: 10000,
    withCredentials: true,
});

export const api = {
    get: {
        files: () => {
            return server.get('file/list');
        },
        file: ({fileId, discussionId}) => {
            return server.get('file', {params: {fileId, discussionId}});
        },
        researches: ({fileId, discussionId}) => {
            return server.get('research/list', {params: {fileId, discussionId}})
        },
        research: ({researchId, discussionId}) => {
            return server.get('research', {params: {researchId, discussionId}})
        },
        discussions: () => {
            return server.get('discussion/list')
        },
        discussion_comments: ({discussionId}) => {
            return server.get('discussion/comments', {params: {discussionId}})
        },
        discussion_accesses: ({discussionId}) => {
            return server.get('discussion/accesses', {params: {discussionId}})
        }
    },
    post: {
        login: ({data}) => server.post('auth/login', data),
        register: ({data}) => server.post('auth/register', data),
        file: ({data}) => server.post('file', data),
        research: ({data}) => server.post('research', data),
        discussion_create: ({data}) => server.post('discussion/create', data),
        discussion_join: ({data}) => server.post('discussion/join', data),
        discussion_leave: ({data}) => server.post('discussion/leave', data),
        discussion_comment: ({data}) => server.post('discussion/comment', data),
        discussion_accesses: ({data}) => server.post('discussion/accesses', data),
    },
    delete: {
        file: ({data}) => server.delete('file', {data}),
        research: ({data}) => server.delete('research', {data}),
        discussion: ({data}) => server.delete('discussion', {data}),
        discussion_comment: ({data}) => server.delete('discussion/comment', {data}),
    }
}