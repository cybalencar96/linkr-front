import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr"

function sendLoginRequest (body){
    return axios.post(`${BASE_URL}/sign-in`, body);
}

function sendSignupRequest (body){
    return axios.post(`${BASE_URL}/sign-up`, body)
}

function getPosts(config) {
    return axios.get(`${BASE_URL}/posts`,config)
}

export {
    sendLoginRequest,
    sendSignupRequest,
    getPosts,
}