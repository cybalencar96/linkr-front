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

function getPosts(config) {
    return axios.get(`${BASE_URL}/posts`, config);
}

function getHashtags(config) {
    return axios.get(`${BASE_URL}/hashtags/trending`, config);
}

function getMyLikedPosts(config) {
    return axios.get(`${BASE_URL}/posts/liked`, config);
}

function getPostsByUserId (userId, config){
    return axios.get(`${BASE_URL}/users/${userId}/posts`, config);
}

function getPostsByHashtag (hashtag, config) {
    return axios.get(`${BASE_URL}/hashtags/${hashtag}/posts`, config);
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
function validadeUrlImage(url) {
    return axios.get(`${url}`)
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
    getUser
    validadeUrlImage
}

