import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/Context';
import './sidebar.scss';

const Sidebar = () => {
    const { cates } = useContext(AppContext);
    let navigate = useNavigate();

    return (
        <aside className='categories'>
            <h4>TEMUKAN LEBIH BANYAK APA YANG PENTING BAGI ANDA</h4>
            {cates.map((cate, index) => {
                const handleClick = () => {
                    navigate(`/tag/${cate.name}`);
                };
                return (
                    <div className='cates'>
                        <button
                            key={index}
                            className='cate-btn'
                            onClick={handleClick}
                        >
                            {cate.name}
                        </button>
                    </div>
                );
            })}
        </aside>
    );
};

export default Sidebar;
