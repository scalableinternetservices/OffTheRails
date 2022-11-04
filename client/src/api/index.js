import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' }); // replace with deployment link
// const API = axios.create({ baseURL: 'http://localhost:3000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


export const signIn = (formData) => API.post('/login', formData);
export const signUp = (formData) => API.post('/users', formData);
export const signOut = () => API.post('/logout');

export const fetchItems = () => API.get('/items');