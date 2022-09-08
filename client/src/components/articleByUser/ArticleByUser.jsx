import React from 'react';
import Articles from '../articles/Articles';
import './articleByUser.scss';

const ArticleByUser = ({ posts, dataProfile, user, cate, cateName }) => {
    return (
        <section className='articleByUser'>
            {user && <h1 className='user-name'>{dataProfile.username}</h1>}
            {cate && (
                <h3 className='category-name'>
                    Artikel berdasarkan kategori: {cateName}
                </h3>
            )}

            {posts.map((post) => {
                return (
                    <div className='user-article' key={post._id}>
                        <Articles post={post} />
                    </div>
                );
            })}
        </section>
    );
};

export default ArticleByUser;
