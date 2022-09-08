import React from 'react';
import './modal.scss';

export const Modal = ({ type }) => {
    return (
        <div className='modal'>
            <div className='modal__container'>
                <h3 className='modal-title'>
                    {type === 'register' ? 'Gabung' : 'Masuk'} ke Perantara
                </h3>
                <form className='modal-form'>
                    {type === 'register' && (
                        <>
                            <label>Username</label>
                            <input
                                type='text'
                                placeholder='Masukkan username...'
                                className='modal-input'
                            />
                        </>
                    )}
                    <label>Email</label>
                    <input
                        type='text'
                        placeholder='Masukkan email...'
                        className='modal-input'
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Masukkan password...'
                        className='modal-input'
                    />
                    <button className='modal-submit'>
                        {type === 'register' ? 'Register' : 'Login'}
                    </button>
                </form>
                {type === 'register' ? (
                    <div className='modal__btn'>
                        <h5>Sudah memiliki akun?</h5>
                        <span>Login sekarang</span>
                    </div>
                ) : (
                    <div className='modal__btn'>
                        <h5>Belum memiliki akun?</h5>
                        <span>Daftar sekarang</span>
                    </div>
                )}
            </div>
        </div>
    );
};
