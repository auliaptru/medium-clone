import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/Context';

import './rightSidebarLogin.scss';

const RightSidebarLogin = () => {
    const { user, dispatch, openModalLogin, openModalRegister } =
        useContext(AppContext);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <div>
            {!user ? (
                <div className='sidebar__login-btn'>
                    <button className='register-btn' onClick={openModalLogin}>
                        Get Started
                    </button>
                    <button className='login-btn' onClick={openModalRegister}>
                        Sign In
                    </button>
                </div>
            ) : (
                <button className='logout-btn' onClick={handleLogout}>
                    Logout
                </button>
            )}
            <div className='sidebar__search-form'>
                <form className='search'>
                    <button className='search-btn'>
                        <i class='fa-solid fa-magnifying-glass'></i>
                    </button>
                    <input
                        type='text'
                        placeholder='Search'
                        className='search-term'
                    />
                </form>
            </div>
        </div>
    );
};

export default RightSidebarLogin;
