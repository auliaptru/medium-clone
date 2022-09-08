import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { Article } from '../../components/article/Article';
import { LeftSidebar } from '../../components/sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '../../components/sidebar/rightSidebar/RightSidebar';
import { Login } from '../login/Login';
import { Register } from '../register/Register';
import '../page.scss';

const SinglePost = () => {
    const [article, setArticle] = useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[3];

    useEffect(() => {
        const getArticle = async () => {
            const res = await axios.get('/posts/' + path);
            setArticle(res.data);
        };
        getArticle();
    }, [path]);

    return (
        <section className='page'>
            <Login />
            <Register />
            <div className='page__left-sidebar'>
                <LeftSidebar />
            </div>
            <div className='page__content'>
                <Article />
            </div>
            <div className='page__right-sidebar'>
                <RightSidebar article={article} bio={true} />
            </div>
        </section>
    );
};

export default SinglePost;
