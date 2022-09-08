import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppContext, useGlobalContext } from '../../context/Context';
import './topbar.scss';

const Topbar = () => {
    const { openModalLogin, openModalRegister } = useGlobalContext();
    const { user, dispatch } = useContext(AppContext);
    const publicFolder = 'http://localhost:5000/images/';

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        window.location.replace('/');
    };

    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/settings/${user._id}`);
    };

    return (
        <nav className='topbar'>
            <div className='topbar__left'>
                <div className='topbar-title'>
                    <i className='icon fa-solid fa-blog'></i>
                    <Link to='/' className='link'>
                        <p>Perantara</p>
                    </Link>
                </div>
            </div>
            <div className='topbar__right'>
                <ul className='topbar-list'>
                    <Link to='/tentang' className='link'>
                        <li className='topbar-list__item'>Tentang kami</li>
                    </Link>
                    {user ? (
                        <Link to='/tulis' className='link'>
                            <li className='topbar-list__item'>Tulis</li>
                        </Link>
                    ) : (
                        <li
                            className='topbar-list__item'
                            onClick={openModalLogin}
                        >
                            Tulis
                        </li>
                    )}
                    {user ? (
                        <>
                            <li
                                className='topbar-list__item'
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                            <div className='pr' onClick={handleClick}>
                                {/* <Link to='/settings/' className='link'> */}
                                {user.profilePic ? (
                                    <img
                                        src={publicFolder + user.profilePic}
                                        alt=''
                                        className='profileImg topbar-list__item'
                                    />
                                ) : (
                                    <img
                                        src='icon-profile.png'
                                        alt=''
                                        className='profileImg topbar-list__item'
                                    />
                                )}
                                {/* </Link> */}
                            </div>
                        </>
                    ) : (
                        <>
                            <li
                                className='topbar-list__item'
                                onClick={openModalLogin}
                            >
                                Sign In
                            </li>
                            <li
                                className='topbar-list__item sign-up'
                                onClick={openModalRegister}
                            >
                                Get Started
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Topbar;
