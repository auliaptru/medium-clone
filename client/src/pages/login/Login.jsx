import React, { useRef } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AppContext, useGlobalContext } from '../../context/Context';
import './login.scss';
import { useEffect } from 'react';

export const Login = () => {
    const { isModalOpenLogin, closeModalLogin, switchLogin } =
        useGlobalContext();
    const userRef = useRef();
    const passwordRef = useRef();

    const { user, dispatch, error } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });
        try {
            const res = await axios.post('/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    };

    return (
        <div
            className={`${
                isModalOpenLogin && !user ? 'modal show-modal' : 'modal'
            }`}
        >
            <div className='modal__container'>
                <h3 className='modal-title'>Masuk ke Perantara</h3>
                <form className='modal-form' onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Masukkan username...'
                        className='modal-input'
                        ref={userRef}
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Masukkan password...'
                        className='modal-input'
                        ref={passwordRef}
                    />
                    <button className='modal-submit' type='submit'>
                        Login
                    </button>
                </form>

                <div className='modal__link'>
                    <p>Belum memiliki akun?</p>
                    <span className='link' onClick={switchLogin}>
                        Daftar Sekarang
                        {/* <Link to='/register'>Daftar Sekarang</Link> */}
                    </span>
                </div>
                <button className='modal__close-btn' onClick={closeModalLogin}>
                    <i className='fa-solid fa-xmark'></i>
                </button>
                {error && (
                    <span style={{ color: 'red' }}>
                        Username atau password salah!
                    </span>
                )}
            </div>
        </div>
    );
};
