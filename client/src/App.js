import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import SinglePost from './pages/singlePost/SinglePost';
import Write from './pages/writePost/Write';
import Profile from './pages/profile/Profile';

import './App.scss';
import UserPost from './pages/userPost/UserPost';
import HomeUser from './pages/homeUser/HomeUser';
import Categories from './pages/categories/Categories';
import About from './pages/about/About';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/tulis' element={<Write />} />
                    <Route path='/tentang' element={<About />} />
                    <Route path='/artikel' element={<HomeUser />} />
                    <Route path='/artikel/:name/:id' element={<SinglePost />} />
                    <Route path='/settings/:id' element={<Profile />} />
                    <Route path='/user/:name' element={<UserPost />} />
                    <Route path='/tag/:name' element={<Categories />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
