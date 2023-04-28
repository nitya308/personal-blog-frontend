import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="content">Content:
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>

        </div>
        <div>
          <label htmlFor="tags">Tags:    <input
            id="tags"
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
          </label>
        </div>
        <div>
          <label htmlFor="coverUrl">Cover Url:
            <input
              id="coverUrl"
              type="text"
              value={coverUrl}
              onChange={(event) => setCoverUrl(event.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default connect(null)(NewPost);
