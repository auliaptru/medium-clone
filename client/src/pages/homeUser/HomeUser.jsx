import React, { useContext } from 'react';
import Articles from '../../components/articles/Articles';
import { LeftSidebar } from '../../components/sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '../../components/sidebar/rightSidebar/RightSidebar';
import { AppContext } from '../../context/Context';
import './homeUser.scss';

const HomeUser = () => {
    const { post } = useContext(AppContext);

    console.log(post);

    return (
        <div className='homeUser'>
            <div className='homeUser-left'>
                <LeftSidebar />
            </div>
            <div className='homeUser-content'>
                <h1>Selamat Datang di Perantara</h1>
                {post.map((obj, index) => {
                    return <Articles post={obj} key={index} />;
                })}
            </div>
            <div className='homeUser-right'>
                <RightSidebar />
            </div>
        </div>
    );
};

export default HomeUser;
