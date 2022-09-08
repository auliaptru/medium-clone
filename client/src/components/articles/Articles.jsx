import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/Context';
import './articles.scss';

const Articles = ({ post }) => {
    const { user } = useContext(AppContext);
    const { photoProfile, username } = post;

    let navigate = useNavigate();
    const handleClick = () => {
        const title = post.title;
        const replace = decodeURIComponent(
            title.replaceAll(' ', '-').toLowerCase()
        );
        navigate(`/artikel/${replace}/${post._id}`);
    };

    const publicFolder = 'http://localhost:5000/images/';
    return (
        <article className='articles'>
            <div className='articles__wrapper'>
                <div className='trending__articles'>
                    <section className='article__author'>
                        {!user && (
                            <img
                                src={
                                    photoProfile
                                        ? publicFolder + photoProfile
                                        : '/icon-profile.png'
                                }
                                alt=''
                                className='author-img'
                            />
                        )}
                        <p className='author-name'>{username}</p>
                    </section>
                    <section className='article-content'>
                        <div className='article-content__wrapper'>
                            <h3
                                className='article-content__title'
                                onClick={handleClick}
                            >
                                {post.title}
                            </h3>
                            <p className='article-content__desc'>{post.desc}</p>
                        </div>
                        <div className='article-content__info'>
                            <p className='article-date'>
                                {new Date(post.createdAt).toDateString()}
                            </p>
                            <div className='article-cate'>
                                {post.categories.map((cate, index) => {
                                    const handleClickCates = () => {
                                        navigate(`/tag/${cate}`);
                                    };
                                    return (
                                        <p
                                            key={index}
                                            onClick={handleClickCates}
                                        >
                                            {cate}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
                {post.photo && (
                    <img
                        src={post.photo && publicFolder + post.photo}
                        alt=''
                        className='article-img'
                    />
                )}
            </div>
        </article>
    );
};

export default Articles;
