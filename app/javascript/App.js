import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Item from './components/Item/Item';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Orders from  './components/Orders/Orders';

const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />}/>
                <Route path="/auth" exact element={<Auth />}/>
                <Route path="/items/:id" exact element={<Item />}/>
                <Route path="/users/:id" exact element={<User />}/>
                <Route path="/orders" exact element={<Orders />}/>
                <Route path="/cart" exact element={<Cart />}/>
            </Routes>
        </Container>
    </BrowserRouter>
)

export default App;