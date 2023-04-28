import React from 'react';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
import '../style.scss';
import NewPost from './newpost';
import Posts from './posts';
import Post from './post';

function Nav(props) {
  return (
    <nav>
      <ul>
        <li id="site-name"><NavLink to="/">My Blog</NavLink></li>
        <li id="new-post-button"><NavLink to="/posts/new"><i className="fa-solid fa-plus" />new post</NavLink></li>
      </ul>
    </nav>
  );
}

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="*" element={<div>post not found </div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
