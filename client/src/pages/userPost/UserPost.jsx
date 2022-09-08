import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import ArticleByUser from '../../components/articleByUser/ArticleByUser';
import { RightSidebar } from '../../components/sidebar/rightSidebar/RightSidebar';
import { LeftSidebar } from '../../components/sidebar/leftSidebar/LeftSidebar';
import '../page.scss';

const UserPost = () => {
    const [posts, setPosts] = useState([]);
    const [dataProfile, setDataProfile] = useState([]);

    const { search } = useLocation();
    const location = useLocation();
    const path = location.pathname.split('/')[2];

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search);
            setPosts(res.data.filter((user) => user.username === path));
            setDataProfile(res.data[0]);
        };
        fetchPosts();
    }, [search, path]);

    return (
        <div className='page'>
            <div className='page__left-sidebar'>
                <LeftSidebar />
            </div>
            <div className='page__content'>
                <ArticleByUser
                    posts={posts}
                    dataProfile={dataProfile}
                    user={true}
                />
            </div>
            <div className='page__right-sidebar'>
                <RightSidebar article={dataProfile} bio={true} />
            </div>
        </div>
    );
};

export default UserPost;
