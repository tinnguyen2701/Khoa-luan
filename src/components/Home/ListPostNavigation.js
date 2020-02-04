import React from 'react';
import store from 'store';
import styled from 'styled-components';
import { GET_POST_REQUEST } from './ducks';

const Button = styled.button`
  outline: none;
  width: 100%;
  text-align: left;
  border: none;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px 15px;
  font-size: 16px;
  background: none;

  ${props =>
    props.navActiveColor === props.postItemName && 'color: steelblue; text-decoration: underline'};
  :hover {
    color: steelblue;
    text-decoration: underline;
  }
`;

export default ({ ListPostNavigation, page, history }) => {
  const onClickHandler = name => {
    window.localStorage.setItem('navActiveColor', name);
    store.dispatch({ type: GET_POST_REQUEST, payload: { page, name } });
    history.push(`/${page}/${name}`);
  };

  return (
    <ul>
      {ListPostNavigation &&
        ListPostNavigation.length > 0 &&
        ListPostNavigation.map((postItem, index) => (
          <li key={index.toString()}>
            <Button
              navActiveColor={window.localStorage.getItem('navActiveColor')}
              postItemName={postItem.name}
              type="button"
              onClick={() => onClickHandler(postItem.name)}
            >
              {postItem.name}
            </Button>
          </li>
        ))}
    </ul>
  );
};
