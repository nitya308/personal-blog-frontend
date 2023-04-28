/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
// some imports
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import TextareaAutosize from 'react-textarea-autosize';
import { fetchPost, deletePost, updatePost } from '../actions/index';

function Post(props) {
  const { postID } = useParams();
  console.log('id', postID);

  useEffect(() => {
    props.fetchPost(postID);
  }, []);

  const {
    title, content, tags, coverUrl,
  } = props.currentPost;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newImgUrl, setNewImgUrl] = useState(coverUrl);
  const [newTags, setNewTags] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleDeletePost = () => {
    props.deletePost(postID);
  };

  const handleUpdatePost = () => {
    const newPost = {
      title: newTitle,
      content: newContent,
      tags: newTags,
      coverUrl: newImgUrl,
    };
    props.updatePost(newPost);
    setIsEditing(false);
  };

  function renderPost() {
    return (
      <div>
        <h1>{title}</h1>
        <img src={coverUrl} alt={title} />
        <div>{tags}</div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  function renderEditMode() {
    return (
      <form>
        <label htmlFor="title">Title:
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </label>
        <label htmlFor="imgUrl">Image URL:
          <input
            id="imgUrl"
            type="text"
            value={newImgUrl}
            onChange={(event) => setNewImgUrl(event.target.value)}
          />
        </label>
        <label htmlFor="tags">Tags:
          <input
            id="tags"
            type="text"
            value={newTags}
            onChange={(event) => setNewTags(event.target.value)}
          />
        </label>
        <label htmlFor="content"> Content:
          <TextareaAutosize required
            id="content"
            value={newContent}
            onChange={(event) => setNewContent(event.target.value)}
          />
        </label>
      </form>
    );
  }

  function renderEditIcon() {
    if (isEditing) {
      return (
        <i role="button" tabIndex="0" aria-label="Edit" onClick={handleUpdatePost} className=" fa-solid fa-check" />
      );
    }
    return <i role="button" tabIndex="0" aria-label="Done editing" onClick={() => { setIsEditing(true); }} className="fa-solid fa-pen-to-square icon-edit" />;
  }

  function renderBasedOnMode() {
    if (isEditing) {
      return renderEditMode();
    }
    return renderPost();
  }

  return (
    <Paper className="single-post">
      <div className="icons">
        {renderEditIcon()}
        <i role="button" tabIndex="0" aria-label="Delete" onClick={handleDeletePost} className="fa fa-trash-o icon-delete" />
      </div>
      {renderBasedOnMode()}
    </Paper>
  );
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
