import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { LeftSidebar } from '../../components/sidebar/leftSidebar/LeftSidebar';
import { RightSidebar } from '../../components/sidebar/rightSidebar/RightSidebar';
import Settings from '../../components/settings/Settings';
import './profile.scss';

const Profile = () => {
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
        <div className='profile'>
            <div className='left-sidebar'>
                <LeftSidebar />
            </div>
            <div className='setting-profile'>
                <Settings />
            </div>
            <div className='right-sidebar'>
                <RightSidebar article={article} bio={false} />
            </div>
        </div>
    );
};

export default Profile;
