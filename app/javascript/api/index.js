import axios from 'axios';

 const API = axios.create({ baseURL: 'http://bryanxu.eba-pqkhfm2c.us-west-2.elasticbeanstalk.com' }); // replace with deployment link
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

export const fetchItemPage = (id) => API.get(`/items/page/${id}`);
export const fetchItems = () => API.get('/items');
export const fetchItem = (id) => API.get(`/items/${id}`);
export const createItem = (newItem) => API.post('/items', newItem);
export const updateItem = (id, updatedItem) => API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const fetchUser = (id) => API.get(`/users/${id}`);

export const fetchUnpurchasedOrder = (user) => API.get(`/current_order`, { params: {user_id: user}});
export const updateOrder = (id, updatedOrder) => API.patch(`/orders/${id}`, updatedOrder);
export const fetchOrders = (user) => API.get(`/orders`, { params: {user_id: user}});
export const fetchOrder = (id) => API.get(`/orders/${id}`);

export const createOrderItem = (orderItem) => API.post(`/order_items`, orderItem);
export const fetchOrderItems = (order) => API.get(`/order_items`, { params: {order_id: order}});
export const fetchOrderItemObjects = (order) => API.get(`/current_order_items`, { params: {order_id: order}});
export const updateOrderItem = (id, updatedOrderItem) => API.patch(`/order_items/${id}`, updatedOrderItem);
export const deleteOrderItem = (id) => API.delete(`/order_items/${id}`);

export const fetchRatings = () => API.get('/ratings');
export const createRating = (newRating) => API.post('/ratings', newRating);
export const updateRating = (id, updatedRating) => API.patch(`/ratings/${id}`, updatedRating);
export const deleteRating = (id) => API.delete(`/ratings/${id}`);
export const fetchRating = (id) => API.get(`/ratings/${id}`);
