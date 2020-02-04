import React, { useEffect } from 'react';
import store from 'store';
import { GET_ALL_POST_REQUEST } from './ducks';
import NewAbout from './NewAbout';
import ListPostsAbout from './ListPostsAbout';

export default () => {
  useEffect(() => {
    store.dispatch({ type: GET_ALL_POST_REQUEST, payload: 'About' });
  }, []);

  return (
    <div>
      <NewAbout />
      <p style={{ marginTop: '20px', marginBottom: '10px' }}>Danh sách list posts about</p>
      <ListPostsAbout />
    </div>
  );
};
