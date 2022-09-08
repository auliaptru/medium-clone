import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/Context';
import './settings.scss';

const Settings = () => {
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [success, setSuccess] = useState(false);
    const [update, setUpdate] = useState(false);

    console.log(email);
    const { user, dispatch } = useContext(AppContext);
    const publicFolder = 'http://localhost:5000/images/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' });
        const updateUser = {
            userId: user._id,
            email,
            password,
            bio,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updateUser.profilePic = filename;
            try {
                await axios.post('/upload', data);
            } catch (error) {}
        }

        try {
            const res = await axios.put('/users/' + user._id, updateUser);
            dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
            setSuccess(true);
            window.location.reload();
        } catch (error) {
            dispatch({ type: 'UPDATE_FAILURE' });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete('/users/' + user._id, {
                data: { username: user.username },
            });
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className='settings'>
            <div className='settings-wrapper'>
                <div className='settings-title'>
                    <span className='settings-title__update'>
                        Update Your Account
                    </span>
                    <span
                        className='settings-title__delete'
                        onClick={handleDelete}
                    >
                        Delete Account
                    </span>
                </div>
                <form className='settings__form' onSubmit={handleSubmit}>
                    <label>Foto Profil</label>
                    <div className='settings__form-PP'>
                        {file ? (
                            <img src={URL.createObjectURL(file)} alt='' />
                        ) : (
                            <img
                                src={
                                    user.profilePic
                                        ? publicFolder + user.profilePic
                                        : '/icon-profile.png'
                                }
                                alt=''
                            />
                        )}
                        {update && (
                            <>
                                <label htmlFor='fileInput'>
                                    <i className='settings-PP__icon fa-regular fa-circle-user'></i>
                                </label>
                                <input
                                    type='file'
                                    id='fileInput'
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </>
                        )}
                    </div>

                    <label>Username</label>
                    <div className='author-settings'>
                        <p className='author-desc'>{user.username}</p>
                    </div>

                    <label>Biodata</label>
                    {!update ? (
                        <div className='author-settings'>
                            <p className='author-desc'>
                                {user.bio ? user.bio : 'Tidak ada biodata'}
                            </p>
                        </div>
                    ) : (
                        <input
                            type='text'
                            value={bio}
                            placeholder={user.bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    )}

                    <label>Email</label>
                    {!update ? (
                        <div className='author-settings'>
                            <p className='author-desc'>{user.email}</p>
                        </div>
                    ) : (
                        <input
                            type='text'
                            value={email}
                            placeholder={user.email}
                            onChange={(e) => setEmail(e.target.value)}
                            // required
                        />
                    )}
                    {update && (
                        <>
                            <label>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}
                    {!update ? (
                        <button
                            className='settings__form-submit'
                            onClick={() => setUpdate(true)}
                        >
                            Update
                        </button>
                    ) : (
                        <div className='settings__btn-group'>
                            <button
                                className='settings__form-save'
                                type='submit'
                            >
                                Save
                            </button>
                            <button
                                className='settings__form-cancel'
                                onClick={() => setUpdate(false)}
                            >
                                Batal
                            </button>
                        </div>
                    )}
                    {success && (
                        <span
                            style={{
                                color: 'green',
                                textAlign: 'center',
                                margin: '40px 0',
                            }}
                        >
                            Profile berhasil di update!
                        </span>
                    )}
                </form>
            </div>
            {/* <BioUser /> */}
        </section>
    );
};

export default Settings;
