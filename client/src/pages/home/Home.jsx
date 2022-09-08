import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import ContentHome from '../../components/contentHome/ContentHome';
import Header from '../../components/header/Header';
import Topbar from '../../components/topbar/Topbar';
import Trending from '../../components/trending/Trending';

import './home.scss';
import { useContext } from 'react';
import { AppContext } from '../../context/Context';
import HomeUser from '../homeUser/HomeUser';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [trending, setTrending] = useState([]);

    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts' + search);
            setPosts(res.data);
            setTrending(res.data.slice(0, 6));
        };
        fetchPosts();
    }, [search]);

    console.log(posts.filter((post) => post.categories));

    const { user } = useContext(AppContext);

    return (
        <div className='home'>
            {!user ? (
                <>
                    <Topbar />
                    <Header posts={posts} />
                    <Trending posts={trending} />
                    <ContentHome posts={posts} />
                </>
            ) : (
                <HomeUser />
            )}
        </div>
    );
};

export default Home;
