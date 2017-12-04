import axios from 'axios';

axios.defaults.baseURL = 'http://vascosilva.hopto.org';

const token = localStorage.getItem("token");
if(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;    
}

const getAuthID = () => {
        return axios.get('/api/auth_user')
        .then((response) => { return response })
        .catch(error => console.log(error));   
}

const postLogin = (code) => {
    return axios.post('/oauth/token', {
        grant_type:'authorization_code',
        client_id:'1',
        client_secret:'nSa4ZpbGejKJpHp0i9m9amLy2htjYgF3fpjxNKF3',
        redirect_uri:'http://localhost:3000/callback',
        code:code
    })
    .then((response) => { return response })
    .catch(error => console.log(error));
}


export {getAuthID, postLogin}