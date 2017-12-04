import axios from 'axios';

const token = localStorage.getItem("token");
if(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;    
}

const getUsers = () => {
    return axios.get('http://vascosilva.hopto.org/api/user')
    .then((response) => { return response })
    .catch(error => console.log(error));
} 

const getUser = (id) => {
    return axios.get('http://vascosilva.hopto.org/api/user/'+id)
    .then((response) => { return response })
    .catch(error => console.log(error));
}

const getUserPosts = (id) => {
    return axios.get('http://vascosilva.hopto.org/api/userPosts/'+id)
    .then((response) => { return response })
    .catch(error => console.log(error));
}
const searchUserPosts = (query, id) => {
    return axios.post('/api/searchUserPosts', {
        query: query,
        id_user: id
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}


const searchUsers = (query) => {
    return axios.post('/api/searchUser', {
        query: query
    })
        .then((response) => { return response })
        .catch(error => console.log(error));
}


export {getUsers, getUser, getUserPosts, searchUserPosts, searchUsers}