import React from 'react';
import Articles from '../articles/Articles';
import CatesSidebar from '../sidebar/catesSidebar/CatesSidebar';
import './contentHome.scss';

const ContentHome = ({ posts }) => {
    return (
        <section className='content'>
            <div className='content-article'>
                {posts.map((post) => {
                    return <Articles post={post} />;
                })}
            </div>
            <div className='content-sidebar'>
                <CatesSidebar posts={posts} />
            </div>
        </section>
    );
};

export default ContentHome;
