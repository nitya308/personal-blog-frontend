/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextareaAutosize from 'react-textarea-autosize';

function NewPost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const post = {
      title,
      content,
      tags,
      cover_url: coverUrl,
    };
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'ADD_POST',
          payload: data,
        });
        navigate(`/posts/${data.id}`);
      });
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

export default connect(null)(NewPost);
