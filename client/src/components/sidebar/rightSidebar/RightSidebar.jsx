import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';

import RightSidebarLogin from '../rightSidebarLogin/RightSidebarLogin';
import './rightSidebar.scss';

export const RightSidebar = ({ article, bio }) => {
    const { post } = useContext(AppContext);

    let shuffle = post
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 4);

    const publicFolder = 'http://localhost:5000/images/';
    let navigate = useNavigate();

    return (
        <div className='right-sidebar'>
            <RightSidebarLogin />

            {bio && (
                <div className='sidebar__author-info'>
                    <img
                        src={
                            article.photoProfile
                                ? publicFolder + article.photoProfile
                                : '/icon-profile.png'
                        }
                        alt=''
                        className='author-img'
                    />

                    <p className='author-name'>{article.username}</p>
                    <p className='author-desc'>
                        {article.biodata
                            ? article.biodata
                            : 'Tidak ada biodata'}
                    </p>
                </div>
            )}

            <h4>Lebih banyak dari Perantara</h4>
            {shuffle.map((data, index) => {
                const { title, photo, username, photoProfile } = data;
                const handleClick = () => {
                    const titlePost = title;
                    const replace = decodeURIComponent(
                        titlePost.replaceAll(' ', '-').toLowerCase()
                    );
                    navigate(`/artikel/${replace}/${data._id}`);
                };
                return (
                    <div key={index}>
                        <div className='sidebar__more-articles'>
                            {post ? (
                                <>
                                    <div
                                        className='article-title'
                                        onClick={handleClick}
                                    >
                                        <div className='author'>
                                            <img
                                                src={
                                                    photoProfile
                                                        ? publicFolder +
                                                          photoProfile
                                                        : '/icon-profile.png'
                                                }
                                                alt=''
                                                className='author-img__more'
                                            />
                                            <p>{username}</p>
                                        </div>
                                        <h4 className='author-title__article'>
                                            {title}
                                        </h4>
                                    </div>
                                    <div className='article-image'>
                                        {photo && (
                                            <img
                                                src={publicFolder + photo}
                                                alt=''
                                            />
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p>Tidak ada artikel</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
