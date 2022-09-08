import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';
import axios from 'axios';

import Reducer from './Reducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user') || null),
    isFetching: false,
    error: false,
    isLogin: false,
};

const AppContext = React.createContext(INITIAL_STATE);

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
    const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
    const [post, setPost] = useState([]);
    const [cates, setCates] = useState([]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    useEffect(() => {
        const getArticle = async () => {
            const res = await axios.get('/posts');
            setPost(res.data);
        };
        getArticle();
    }, []);

    useEffect(() => {
        const getCates = async () => {
            const res = await axios.get('/categories');
            setCates(res.data);
        };
        getCates();
    }, []);

    // const handleDelete = async () => {
    //     try {
    //         await axios.delete(`/posts/${user._id}`, {
    //             data: { username: user.username },
    //         });
    //         window.location.replace('/');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleUpdate = async () => {
    //     try {
    //         await axios.put(`/posts/${user._id}`, {
    //             username: user.username,
    //             title: titleArticle,
    //             desc: descArticle,
    //         });
    //         window.location.reload();
    //     } catch (error) {}
    // };

    const openModalLogin = () => {
        setIsModalOpenLogin(true);
    };

    const closeModalLogin = () => {
        setIsModalOpenLogin(false);
    };

    const openModalRegister = () => {
        setIsModalOpenRegister(true);
    };

    const closeModalRegister = () => {
        setIsModalOpenRegister(false);
    };

    const switchLogin = () => {
        setIsModalOpenLogin(false);
        setIsModalOpenRegister(true);
    };

    const switchRegister = () => {
        setIsModalOpenLogin(true);
        setIsModalOpenRegister(false);
    };

    return (
        <AppContext.Provider
            value={{
                isModalOpenLogin,
                isModalOpenRegister,
                openModalLogin,
                closeModalLogin,
                openModalRegister,
                closeModalRegister,
                switchRegister,
                switchLogin,
                // handleUpdate,
                // handleDelete,
                post,
                cates,
                // titleArticle,
                // setTitleArticle,
                // descArticle,
                // setDescArticle,

                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                isLogin: state.isLogin,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
