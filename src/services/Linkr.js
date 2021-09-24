import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

function createConfig (token){
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function sendLoginRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body);
}

function sendSignupRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body);
}

function sendPostLinkRequest (body, config){
    return axios.post(`${BASE_URL}/posts`, body, config);
}

function getPosts(token) {
    return axios.get(`${BASE_URL}/posts`, createConfig(token));
}

function getHashtags(config) {
    return axios.get(`${BASE_URL}/hashtags/trending`, config);
}

function getMyLikedPosts(config, page) {
    return axios.get(`${BASE_URL}/posts/liked?limit=10&offset=${page}`, config);
}

function getPostsByUserId (userId, token, page){
    return axios.get(`${BASE_URL}/users/${userId}/posts?limit=10&offset=${page}`, createConfig(token));
}

function getPostsByUser (userId, config, page){
    return axios.get(`${BASE_URL}/users/${userId}/posts?limit=10&offset=${page}`, config);
}

function getPostsByHashtag (hashtag, config, page) {
    return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts?limit=10&offset=${page}`, config);
}

function sendLikeRequest (postId, token) {
    return axios.post(`${BASE_URL}/posts/${postId}/like`, {}, createConfig(token));
}

function sendDislikeRequest (postId, token) {
    return axios.post(`${BASE_URL}/posts/${postId}/dislike`, {}, createConfig(token));
}

function sendDeletePostRequest (postId, token) {
    return axios.delete(`${BASE_URL}/posts/${postId}`, createConfig(token));
}

function sendEditPostRequest (postId, text, token){
    return axios.put(`${BASE_URL}/posts/${postId}`, {text: text}, createConfig(token));
}

function searchUser (queryStr, token) {
    return axios.get(`${BASE_URL}/users/search?username=${queryStr}`,createConfig(token))
}

function getUser (userId,token) {
    return axios.get(`${BASE_URL}/users/${userId}`, createConfig(token))
}
function sendFollowRequest (userId, token){
    return axios.post(`${BASE_URL}/users/${userId}/follow`, {}, createConfig(token));
}

function sendUnfollowRequest (userId, token){
    return axios.post(`${BASE_URL}/users/${userId}/unfollow`, {}, createConfig(token));
}

function getListOfFollowingRequest (token){
    return axios.get(`${BASE_URL}/users/follows`, createConfig(token));
}

function validadeUrlImage(url) {
    return axios.get(`${url}`);
}


function getComments(postId, token) {
    return axios.get(`${BASE_URL}/posts/${postId}/comments`, createConfig(token));
}

function sendComment(postId, text, token){
    return axios.post(`${BASE_URL}/posts/${postId}/comment`, {text}, createConfig(token));
}

function getPostsByFollowUsers (token, type) {
    return axios.get(`${BASE_URL}/following/posts` + type, createConfig(token));
}

export {
    sendLoginRequest,
    sendSignupRequest,
    sendPostLinkRequest,
    getPosts,
    getHashtags,
    getMyLikedPosts,
    getPostsByUserId,
    getPostsByHashtag,
    sendLikeRequest,
    sendDislikeRequest,
    sendDeletePostRequest,
    sendEditPostRequest,
    searchUser,
    getUser,
    sendFollowRequest,
    sendUnfollowRequest,
    getListOfFollowingRequest,
    validadeUrlImage,
    getComments,
    sendComment,
    getPostsByFollowUsers,
    getPostsByUser,
}

