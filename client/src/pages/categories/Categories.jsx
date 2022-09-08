import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { LeftSidebar } from '../../components/sidebar/leftSidebar/LeftSidebar';
import ArticleByUser from '../../components/articleByUser/ArticleByUser';
import { RightSidebar } from '../../components/sidebar/rightSidebar/RightSidebar';

import './categories.scss';

const Categories = () => {
    const [cates, setCates] = useState([]);

    const location = useLocation();
    const path = location.pathname.split('/')[2];

    useEffect(() => {
        const getArticle = async () => {
            const res = await axios.get(`/posts/?cate=${path}`);
            setCates(res.data);
        };
        getArticle();
    }, [path]);

    return (
        <section className='articleByCategories'>
            <div className='articleByCategories-left'>
                <LeftSidebar />
            </div>
            <div className='articleByCategories-contents'>
                <ArticleByUser posts={cates} cate={true} cateName={path} />
            </div>
            <div className='articleByCategories-right'>
                <RightSidebar />
            </div>
        </section>
    );
};

export default Categories;
