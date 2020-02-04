/* eslint-disable */
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import store from 'store';
import { ADD_POST_REQUEST } from './ducks';
import styled from 'styled-components';

const Div = styled.div`
  input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }

  button {
    margin-top: 15px;
    padding: 4px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
  }
`;

export default () => {
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const editor = useRef(null);
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: ADD_POST_REQUEST, payload: { name, describe, page: 'About' } });
    setDescribe('');
    setName('');
  };

  return (
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        <p>Name Post</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <p>Describe</p>

        <JoditEditor
          ref={editor}
          value={describe}
          config={config}
          tabIndex={1}
          onBlur={newContent => setDescribe(newContent)}
          onChange={newContent => {}}
        />
        <button type="submit" disabled={name == '' || describe == ''}>
          Cập nhật
        </button>
      </form>
    </Div>
  );
};
