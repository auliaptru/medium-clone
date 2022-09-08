import React from 'react';
import { useNavigate } from 'react-router-dom';

import './trending.scss';

const Trending = ({ posts }) => {
    let navigate = useNavigate();

    const publicFolder = 'http://localhost:5000/images/';

    return (
        <section className='trending'>
            <div className='trending__title'>
                <i className='fa-solid fa-circle-up'></i>
                <h4>trending di perantara</h4>
            </div>
            <div className='trending__articles'>
                {posts.map((post, index) => {
                    const { title, username, createdAt, photoProfile } = post;

                    const handleClick = () => {
                        const title = post.title;
                        const replace = decodeURIComponent(
                            title.replaceAll(' ', '-').toLowerCase()
                        );
                        navigate(`/artikel/${replace}/${post._id}`);
                    };

                    return (
                        <>
                            <h3 className='article-number'>0{index + 1}</h3>
                            <div className='article-content'>
                                <div className='article-content__author'>
                                    <img
                                        src={
                                            photoProfile
                                                ? publicFolder + photoProfile
                                                : 'icon-profile.png'
                                        }
                                        alt=''
                                        className='author-img'
                                    />
                                    <p className='author-name'>{username}</p>
                                </div>
                                <h3
                                    className='article-content__title'
                                    onClick={handleClick}
                                >
                                    {title}
                                </h3>
                                <p className='article-content__date'>
                                    {new Date(createdAt).toDateString()}
                                </p>
                            </div>
                        </>
                    );
                })}
            </div>
            {/* <hr /> */}
        </section>
    );
};

export default Trending;
