import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/Context';
import './article.scss';

export const Article = () => {
    const [updateMode, setUpdateMode] = useState(false);
    const [article, setArticle] = useState([]);
    const [titleArticle, setTitleArticle] = useState('');
    const [descArticle, setDescArticle] = useState('');
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);

    const { user } = useContext(AppContext);
    let navigate = useNavigate();

    const location = useLocation();
    const path = location.pathname.split('/')[3];

    const updatePost = {
        title: titleArticle,
        desc: descArticle,
    };

    useEffect(() => {
        const getArticle = async () => {
            const res = await axios.get('/posts/' + path);
            setArticle(res.data);
            setTitleArticle(res.data.title);
            setDescArticle(res.data.desc);
            setCategories(res.data.categories);
        };
        getArticle();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${article._id}`, {
                data: { username: user.username },
            });
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            updatePost.photo = filename;
            try {
                await axios.post('/upload', data);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await axios.put(`/posts/${article._id}`, {
                userId: user._id,
                username: user.username,
                title: titleArticle,
                desc: descArticle,
                photoProfile: user.profilePic,
                biodata: user.bio,
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        navigate(`/user/${username}`);
    };

    const publicFolder = 'http://localhost:5000/images/';

    const { photo, createdAt, desc, title, username, photoProfile } = article;

    return (
        <article className='article'>
            <section className='article-info__wrapper'>
                <div className='article__author'>
                    <img
                        src={
                            photoProfile
                                ? publicFolder + photoProfile
                                : '/icon-profile.png'
                        }
                        alt=''
                        className='author-img'
                    />
                    <div className='article-info'>
                        <p className='author-name' onClick={handleClick}>
                            {username}
                        </p>

                        <p className='article-date'>
                            {new Date(createdAt).toDateString()}
                        </p>
                    </div>
                </div>
                <div className='author-socmed'>
                    <i class='icon fa-brands fa-twitter'></i>
                    <i class='icon fa-brands fa-facebook'></i>
                    <i class='icon fa-brands fa-linkedin'></i>

                    <i class='icon-bm fa-regular fa-bookmark'></i>
                </div>
            </section>
            <section className='article__wrapper'>
                {!updateMode ? (
                    <>
                        {photo && (
                            <img
                                className='singlePost-img'
                                src={photo && publicFolder + photo}
                                alt=''
                            />
                        )}
                    </>
                ) : (
                    <>
                        {file ? (
                            <img
                                src={URL.createObjectURL(file)}
                                className='singlePost-img'
                                alt='article-img'
                            />
                        ) : (
                            <img
                                className='singlePost-img'
                                src={photo && publicFolder + photo}
                                alt=''
                            />
                        )}
                        <label htmlFor='fileInput' className='file-input'>
                            <i className='article-icon fa-solid fa-plus'></i>
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
                )}
                {updateMode ? (
                    <>
                        <h4>Judul</h4>
                        <input
                            type='text'
                            value={titleArticle}
                            className='article-title__update'
                            autoFocus
                            onChange={(e) => setTitleArticle(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h1 className='title'>
                            {title}
                            {username === user?.username && (
                                <div className='singlePost-edit__icon'>
                                    <i
                                        className='singlePost-icon fa-regular fa-pen-to-square'
                                        onClick={() => setUpdateMode(true)}
                                    ></i>
                                    <i
                                        className='singlePost-icon fa-regular fa-trash-can'
                                        onClick={handleDelete}
                                    ></i>
                                </div>
                            )}
                        </h1>
                        {categories.map((cate, index) => {
                            const handleClickCates = () => {
                                navigate(`/tag/${cate}`);
                            };
                            return (
                                <p
                                    className='cate-article'
                                    key={index}
                                    onClick={handleClickCates}
                                >
                                    {cate}
                                </p>
                            );
                        })}
                    </>
                )}
                {updateMode ? (
                    <>
                        <h4>Deskripsi</h4>
                        <textarea
                            className='singlePost-desc__update'
                            value={descArticle}
                            onChange={(e) => setDescArticle(e.target.value)}
                            rows='100'
                            cols='100px'
                        />
                    </>
                ) : (
                    <p className='post-desc'>{desc}</p>
                )}
                {updateMode && (
                    <button className='updatePost-btn' onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </section>
        </article>
    );
};
