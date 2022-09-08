import React from 'react';

import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';
import { Article } from '../article/Article';
import { LeftSidebar } from '../sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '../sidebar/rightSidebar/RightSidebar';
import ArticleByUser from '../articleByUser/ArticleByUser';
import './pageTemplate.scss';

const PageTemplate = ({ user }) => {
    return (
        <section className='page'>
            <Login />
            <Register />
            <div className='page__left-sidebar'>
                <LeftSidebar />
            </div>
            <div className='page__content'>
                {user ? <Article /> : <ArticleByUser />}
            </div>
            <div className='page__right-sidebar'>
                <RightSidebar />
            </div>
        </section>
    );
};

export default PageTemplate;
