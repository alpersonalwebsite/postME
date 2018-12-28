import axios from 'axios';
import uuidV1 from 'uuid/v1';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POST,
  RECEIVE_POSTS_ALL,
  ADD_POST,
  SCORE_UP_POST,
  SCORE_DOWN_POST,
  EDIT_POST,
  DELETE_POST,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SCORE_UP_COMMENT,
  SCORE_DOWN_COMMENT, }  from './types';

  const api = 'http://localhost:3001';

  const headers = {
    Accept: 'application/json',
    Authorization: 'alto-guiso'
  };

  export function fetchCategories() {
    const url = `${api}/categories`;
    const request = axios.get(url, { headers });
    return {
      type: RECEIVE_CATEGORIES,
      payload: request
    }
  }

  export function fetchPostsAll() {
    const url = `${api}/posts`;
    const request = axios.get(url, { headers });
    return {
      type: RECEIVE_POSTS_ALL,
      payload: request
    }
  }

  export function fetchPost(postId) {
    const url = `${api}/posts/${postId}`;
    const request = axios.get(url, { headers });
    return {
      type: RECEIVE_POST,
      payload: request
    }
  }

  export function addPost(author, title, category, body) {
    const url = `${api}/posts`;
    const id = uuidV1();
    const timestamp = Date.now();
    const request = axios.post(url, { id, timestamp, author, title, category, body }, { headers });
    return {
      type: ADD_POST,
      payload: request
    }
  }

  export function editPost(title, body, postId) {
    const url = `${api}/posts/${postId}`;
    const request = axios.put(url, { title, body }, { headers });
    return {
      type: EDIT_POST,
      payload: request
    }
  }

  export function deletePost(postId) {
    const url = `${api}/posts/${postId}`;
    const request = axios.delete(url, { headers });
    return {
      type: DELETE_POST,
      payload: request
    }
  }

  export function scoreUporDownPost(postId, upOrDown) {
    const url = `${api}/posts/${postId}`;
    const request = axios.post(url, { "option" : upOrDown  }, { headers });
    if(upOrDown === 'upVote') {
      return {
        type: SCORE_UP_POST,
        payload: request
      }
    }
    else {
      return {
        type: SCORE_DOWN_POST,
        payload: request
      }
    }
  }

  export function fetchComments(postId) {
    const url = `${api}/posts/${postId}/comments`;
    const request = axios.get(url, { headers });
    return {
      type: RECEIVE_COMMENTS,
      payload: request
    }
  }

  export function addComment(author, body, parentId) {
    const url = `${api}/comments`;
    const id = uuidV1();
    const timestamp = Date.now();
    author = author === '' ? 'readable-user' : author;
    body = body === '' ? 'Well... He didn´t say much...!' : body;
    const request = axios.post(url, { id, timestamp, author, body, parentId }, { headers });
    return {
      type: ADD_COMMENT,
      payload: request
    }
  }

  export function editComment(commentId, body) {
    const url = `${api}/comments/${commentId}`;
    const timestamp = Date.now();
    body = body === '' ? 'Well... He didn´t say much...!' : body;
    const request = axios.put(url, { body, timestamp }, { headers });
    return {
      type: EDIT_COMMENT,
      payload: request
    }
  }

  export function deleteComment(commentId) {
    const url = `${api}/comments/${commentId}`;
    const request = axios.delete(url, { headers });
    return {
      type: DELETE_COMMENT,
      payload: request
    }
  }

  export function scoreUporDownComment(commentId, upOrDown) {
    const url = `${api}/comments/${commentId}`;
    const request = axios.post(url, { "option" : upOrDown  }, { headers });
    if(upOrDown === 'upVote') {
      return {
        type: SCORE_UP_COMMENT,
        payload: request
      }
    }
    else {
      return {
        type: SCORE_DOWN_COMMENT,
        payload: request
      }
    }
  }
