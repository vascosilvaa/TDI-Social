import axios from 'axios';

axios.defaults.baseURL = 'http://vascosilva.hopto.org';
const token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}


const getPosts = () => {
    return axios.get('/api/post')
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const postPost = (title, description, subject) => {
    return axios.post('/api/post', {
        title: title,
        description: description,
        subject_id: subject
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const getPost = (id) => {
    return axios.get('/api/post/' + id)
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const getComments = (id) => {
    return axios.get('/api/postComments/' + id)
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const postComment = (message, post_id, date) => {
    return axios.post('/api/comment', {
        content: message,
        post_id: post_id,
        created_at: date,
        updated_at: date
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const getSubjects = () => {
    return axios.get('/api/subject')
        .then((response) => { return response })
        .catch(error => console.log(error));
}


const searchPosts = (query) => {
    return axios.post('/api/searchPost', {
        query: query
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const filterPosts = (id) => {
    return axios.post('/api/filterPosts', {
        id: id
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const postLike = (post_id, user_id) => {
    return axios.post('/api/like', {
        state: 1,
        post_id: post_id,
        user_id: user_id
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}

const putLike = (post_id, user_id, like_id, state) => {
    return axios.put('/api/like/' + like_id, {
        state: state,
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}

export { getPosts, getPost, postPost, getComments, getSubjects, postComment, searchPosts, postLike, putLike, filterPosts }