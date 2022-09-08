import React from 'react';
import { LeftSidebar } from '../../components/sidebar/leftSidebar/LeftSidebar';
import '../page.scss';

const About = () => {
    return (
        <div className='page'>
            <div className='page__left-sidebar'>
                <LeftSidebar />
            </div>
            <div className='page__content'>
                <div className='about'>
                    <h1>Tentang Perantara</h1>
                </div>
            </div>
            <div className='page__right-sidebar'></div>
        </div>
    );
};

export default About;
