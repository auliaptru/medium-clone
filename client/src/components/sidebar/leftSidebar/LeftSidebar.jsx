import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/Context';
import './leftSidebar.scss';

export const LeftSidebar = () => {
    const { user, openModalLogin } = useContext(AppContext);

    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/settings/${user._id}`);
    };
    return (
        <div className='left-sidebar'>
            <div className='sidebar__logo'>
                <i class='icon fa-solid fa-blog'></i>
            </div>
            <div className='sidebar__menu'>
                <Link to='/' className='link'>
                    <i class='icon fa-solid fa-house-user'></i>
                </Link>
                {user ? (
                    <>
                        <i class='icon fa-regular fa-bell'></i>
                        <i class='icon fa-regular fa-bookmark'></i>
                        <i class='icon-read fa-brands fa-readme'></i>

                        <Link to='/tulis' className='link'>
                            <i class='icon-write fa-solid fa-pen-to-square'></i>
                        </Link>

                        <i
                            class='icon fa-solid fa-gear'
                            onClick={handleClick}
                        ></i>
                    </>
                ) : (
                    <>
                        <i
                            class='icon fa-regular fa-bell'
                            tilte='home'
                            onClick={openModalLogin}
                        ></i>
                        <i
                            class='icon fa-regular fa-bookmark'
                            onClick={openModalLogin}
                        ></i>
                        <i
                            class='icon-read fa-brands fa-readme'
                            onClick={openModalLogin}
                        ></i>

                        <i
                            class='icon-write fa-solid fa-pen-to-square'
                            onClick={openModalLogin}
                        ></i>
                        <i
                            class='icon fa-solid fa-gear'
                            onClick={openModalLogin}
                        ></i>
                    </>
                )}
            </div>
        </div>
    );
};
