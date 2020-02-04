/* eslint-disable */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import JoditEditor from 'jodit-react';
import { REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from './ducks';
import store from 'store';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin: 0 5px;
    padding: 3px 5px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
  top: 0;
  left: 0;
  padding: 0 3%;
  overflow-y: scroll;

  p {
    color: white;
    margin: 20px 0;
  }

  button {
    margin-top: 15px;
    padding: 4px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
  }

  input {
    width: 100%;
    padding: 5px;
    border-radius: 8px;
    border: none;
  }

  ${props => (props.isVisible ? 'display: flex;' : 'display: none;')}
`;

const List = ({ listAbout }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const [id, setId] = useState('');
  const editor = useRef(null);
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };
  console.log(listAbout);

  const deletePostHandler = id => {
    store.dispatch({ type: REMOVE_POST_REQUEST, payload: { id, item: 'About' } });
  };

  const editPostHandler = (name, describe, id) => {
    setIsVisible(!isVisible);
    setName(name);
    setDescribe(describe);
    setId(id);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: UPDATE_POST_REQUEST, payload: { name, describe, id, item: 'About' } });
    setDescribe('');
    setName('');
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <Div isVisible={isVisible}>
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
          <button type="submit">Cập nhật</button>
          <button type="button" onClick={() => setIsVisible(false)}>
            Close
          </button>
        </form>
      </Div>
      {listAbout.map((item, index) => (
        <Item key={index.toString()}>
          <p style={{ width: '30%' }}>{item.name}</p>
          <p style={{ fontSize: '15px' }}>{new Date(item.updated_at).toLocaleString()}</p>
          <p>
            <button
              type="button"
              onClick={() => editPostHandler(item.name, item.describe, item._id)}
            >
              Edit
            </button>
            <button type="button" onClick={() => deletePostHandler(item._id)}>
              Delete
            </button>
          </p>
        </Item>
      ))}
    </div>
  );
};
export default connect(state => ({
  listAbout: state.listAbout,
}))(List);
