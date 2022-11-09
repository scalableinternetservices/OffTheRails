import axios from 'axios';

// const API = axios.create({ baseURL: 'http://Justin.eba-pqkhfm2c.us-west-2.elasticbeanstalk.com' }); // replace with deployment link
const API = axios.create({ baseURL: 'http://localhost:3000' });

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
export const createItem = (newItem) => API.post('/items', newItem);
export const updateItem = (id, updatedItem) => API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);