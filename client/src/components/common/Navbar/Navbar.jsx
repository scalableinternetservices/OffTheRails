import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavLinkLogo
} from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                
                <NavMenu>
                    <NavLinkLogo to='/' activeStyle>
                        Off the Rails
                    </NavLinkLogo>
                    <NavLink to='/account' activeStyle>
                        Account
                    </NavLink>
                    <NavLink to='/cart' activeStyle>
                        Cart
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/auth'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;