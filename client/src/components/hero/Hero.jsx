import React from 'react';
import { useContext } from 'react';
import { AppContext, useGlobalContext } from '../../context/Context';

import './hero.scss';

const Hero = () => {
    const { openModalLogin } = useGlobalContext();

    const { user } = useContext(AppContext);

    return (
        <header className='hero'>
            {/* <img
                src='https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
                alt=''
            /> */}
            <div className='hero__title'>
                <h1>Your Ideas Matter.</h1>
                <h3>
                    Discover stories, thinking, and expertise from writers on
                    any topic.
                </h3>
            </div>
            {!user ? (
                <button className='hero__btn' onClick={openModalLogin}>
                    Mulai Membaca
                </button>
            ) : (
                <button className='hero__btn'>Mulai Membaca</button>
            )}
        </header>
    );
};

export default Hero;
