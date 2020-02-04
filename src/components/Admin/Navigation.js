import React from 'react';
import styled from 'styled-components';
import store from 'store';
import { UPDATE_FRAME_REQUEST } from '../../ducks';

const Wrapper = styled.div`
  width: 15%;

  > p > button {
    cursor: pointer;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    margin: 10px 0;
    padding: 5px 20px;
  }
`;

export default () => {
  return (
    <Wrapper>
      <p>
        <button
          type="button"
          onClick={() => store.dispatch({ type: UPDATE_FRAME_REQUEST, payload: 'About' })}
        >
          About
        </button>
      </p>
      <p>
        <button
          type="button"
          onClick={() => store.dispatch({ type: UPDATE_FRAME_REQUEST, payload: 'Document' })}
        >
          Document
        </button>
      </p>
    </Wrapper>
  );
};
