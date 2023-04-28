import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions/index';

function Posts(props) {
  useEffect(() => {
    props.fetchPosts();
  }, []);

  const allPosts = useSelector((store) => store.posts.all);
  const postList = allPosts.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
        <img src={post.cover_url} alt={post.title} />
        <div>{post.tags}</div>
      </Link>
    </li>
  ));
  return (
    <div>
      <h1>All Posts</h1>
      <ul>
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
