import axios from 'axios';
// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=NITYA_AGARWALA';

export function fetchPosts() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        // dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}

export function createPost(post, navigate) {
  /* axios post */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      navigate(`/posts/${response.data.id}`);
    }).catch((error) => {
      // hit an error do something else!
    });
  };
}

export function updatePost(id, post) { /* axios put */
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      // hit an error do something else!
    });
  };
}

export function fetchPost(id) { /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      // hit an error do something else!
    });
  };
}

export function deletePost(id, navigate) {
  /* axios delete */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      navigate('/');
    }).catch((error) => {
      // hit an error do something else!
    });
  };
}

// CURL commands
// # all posts get:
// curl -X GET "https://platform.cs52.me/api/posts?key=NITYA_AGARWALA"

// # create new post
// curl -X POST -H "Content-Type: application/json" -d '{
//     "title": "SECOND post",
//     "tags": "words",
//     "content":  "this is a test post",
//     "coverUrl": "https://media.giphy.com/media/gyRWkLSQVqlPi/giphy.gif"
// }' "https://platform.cs52.me/api/posts/?key=NITYA_AGARWALA"

// # update by POSTID
// curl -X PUT -H "Content-Type: application/json" -d '{
//     "title": "new title"
// }' "https://platform.cs52.me/api/posts/POSTID?key=NITYA_AGARWALA"

// # fetch 1 by POSTID
// curl -X GET "https://platform.cs52.me/api/posts/POSTID?key=NITYA_AGARWALA"

// # delete by POSTID
// curl -X DELETE -H "Content-Type: application/json" "https://platform.cs52.me/api/posts/POSTID?key=NITYA_AGARWALA"
