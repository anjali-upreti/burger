
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgrer-project.firebaseio.com/'
});

export default instance;