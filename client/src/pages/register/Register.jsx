import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/Context';
import './register.scss';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const { isModalOpenRegister, closeModalRegister, switchRegister } =
        useGlobalContext();

    const handleSubmit = async (e) => {
        setError(false);
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', {
                username,
                email,
                password,
            });
            res.data && window.location.replace('/');
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div
            className={`${
                isModalOpenRegister
                    ? 'register-modal show-modal'
                    : 'register-modal'
            }`}
        >
            <div className='register'>
                <h3 className='register__title'>Bergabung ke Perantara</h3>
                <form className='register__form' onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Masukkan username...'
                        className='register__input'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type='text'
                        placeholder='Masukkan email...'
                        className='register__input'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Masukkan password...'
                        className='register__input'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='register__submit-btn' type='submit'>
                        Daftar
                    </button>
                </form>

                <div className='modal-link__login'>
                    <p>Sudah memiliki akun?</p>
                    <span className='login' onClick={switchRegister}>
                        Masuk Sekarang
                    </span>
                </div>

                <button
                    className='register__close-btn'
                    onClick={closeModalRegister}
                >
                    <i className='fa-solid fa-xmark'></i>
                </button>
                {error && <span>Ada yang salah!</span>}
            </div>
        </div>
    );
};
