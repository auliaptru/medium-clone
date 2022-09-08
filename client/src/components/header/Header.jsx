import React from 'react';
import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';
import Hero from '../hero/Hero';
import './header.scss';

const Header = () => {
    return (
        <div>
            <Hero />
            <Login />
            <Register />
        </div>
    );
};

export default Header;
