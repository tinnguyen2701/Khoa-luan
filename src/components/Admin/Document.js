import React, { useEffect } from 'react';
import store from 'store';
import NewDocument from './NewDocument';
import ListPostsDocument from './ListPostsDocument';
import { GET_ALL_POST_REQUEST } from './ducks';

export default () => {
  useEffect(() => {
    store.dispatch({ type: GET_ALL_POST_REQUEST, payload: 'Document' });
  }, []);

  return (
    <div>
      <NewDocument />
      <p style={{ marginTop: '20px', marginBottom: '10px' }}>Danh sách list posts document</p>
      <ListPostsDocument />
    </div>
  );
};
