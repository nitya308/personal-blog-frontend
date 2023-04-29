/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { createPost } from '../actions';

function NewPost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    // some error checking for blank title or content
    if (title.length === 0 || content.length === 0) {
      return;
    }
    const post = {
      title,
      content,
      tags,
      coverUrl,
    };
    // console.log('updating post', newPost);
    props.createPost(post, navigate);
  }

  return (
    <Paper className="single-post">
      <h1>New Post</h1>
      <form>
        <label htmlFor="title">Title:
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label htmlFor="imgUrl">Image URL:
          <input
            id="imgUrl"
            type="text"
            value={coverUrl}
            onChange={(event) => setCoverUrl(event.target.value)}
          />
        </label>
        <label htmlFor="tags">Tags:
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </label>
        <label htmlFor="content"> Content:
          <TextareaAutosize required
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <div id="submit-button" onClick={handleSubmit} role="button" tabIndex={0}>Submit</div>
      </form>
    </Paper>
  );
}

export default connect(null, { createPost })(NewPost);
