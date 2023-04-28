/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { fetchPosts } from '../actions/index';

function Posts(props) {
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const allPosts = useSelector((store) => store.posts.all);
  const postList = allPosts.map((post) => (
    <Card sx={{ maxWidth: 500 }} className="post-card">
      <Link to={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
        <CardMedia
          component="img"
          height="250"
          image={post.coverUrl}
          alt={post.title}
        />
        <CardContent>
          <div>{post.tags}</div>
        </CardContent>
      </Link>
    </Card>
  ));
  return (
    <div>
      <ul id="posts-list">
        {postList}
      </ul>
    </div>
  );
}

// function mapStateToProps(reduxState) {
//   return {
//     allPosts: reduxState.posts.all,
//   };
// }

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(null, { fetchPosts })(Posts);
