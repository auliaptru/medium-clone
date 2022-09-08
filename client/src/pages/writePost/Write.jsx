import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AppContext } from '../../context/Context';
import axios from 'axios';

import './write.scss';
import Topbar from '../../components/topbar/Topbar';

const Write = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const { user, cates } = useContext(AppContext);
    console.log(cates);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            biodata: user.bio,
            photoProfile: user.profilePic,
            title,
            desc,
            categories,
        };

        const cates = {
            name: categories,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            newPost.photo = filename;
            try {
                await axios.post('/upload', data);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await axios.post('/categories', cates);
        } catch (error) {}

        try {
            const res = await axios.post('/posts', newPost);
            const title = res.data.title;
            const replace = decodeURIComponent(
                title.replaceAll(' ', '-').toLowerCase()
            );
            window.location.replace(`/artikel/${replace}/${res.data._id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Topbar />
            <div className='write'>
                <h1 className='write-title'>Publish Artikel</h1>
                {file && (
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : 'https://images.unsplash.com/photo-1598823987912-cea42b5d6a35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
                        }
                        className='post-img'
                        alt='article-img'
                    />
                )}
                <form className='write__form' onSubmit={handleSubmit}>
                    <div className='write__form-wrapper'>
                        <>
                            <label htmlFor='fileInput' className='file-input'>
                                <i className='write__form-icon fa-solid fa-plus'></i>
                                {!file ? (
                                    <span>Tambah gambar</span>
                                ) : (
                                    <span>Ubah gambar</span>
                                )}
                            </label>

                            <input
                                type='file'
                                id='fileInput'
                                style={{ display: 'none' }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </>

                        <input
                            type='text'
                            id='title'
                            placeholder='Judul'
                            className='write__form-input'
                            autoFocus={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='write__form-wrapper'>
                        <input
                            type='text'
                            id='cate'
                            placeholder='Kategori'
                            className='write__form-input'
                            autoFocus={true}
                            onChange={(e) => setCategories(e.target.value)}
                        />
                    </div>
                    <div className='write__form-wrapper'>
                        <textarea
                            name='desc'
                            id='desc'
                            className='write__form-input write-text'
                            placeholder='Tuliskan ceritamu...'
                            type='text'
                            rows='5'
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>

                    <button className='write__form-submit' type='submit'>
                        Publish
                    </button>
                </form>
            </div>
        </>
    );
};

export default Write;
