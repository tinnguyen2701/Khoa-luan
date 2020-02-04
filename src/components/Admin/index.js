import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GET_CURRENT_USER_REQUEST } from './ducks';
import Navigation from './Navigation';
import Frame from './Frame';

const Div = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 3% 8%;

  > div {
    padding: 10px 0;
    font-size: 20px;
  }

  > div a {
    text-decoration: none;
  }

  > div > button {
    cursor: pointer;
    float: right;
    background: rgb(44, 166, 239);
    border: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
  }
`;

const Dashboard = ({ isAuthenticate, dispatch }) => {
  useEffect(() => {
    if (window.localStorage.getItem('JWT')) {
      dispatch({
        type: GET_CURRENT_USER_REQUEST,
        payload: { token: window.localStorage.getItem('JWT') },
      });
    } else {
      window.location.href = `${process.env.REACT_APP_MAIN_URL}login`;
    }
  }, []);

  const signOut = () => {
    window.localStorage.removeItem('JWT');
    window.location.href = `${process.env.REACT_APP_MAIN_URL}login`;
  };

  return (
    isAuthenticate && (
      <Wrapper>
        <div>
          <Link to="/" target="_top">
            Home{' '}
          </Link>
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
        <Div>
          <Navigation />
          <Frame />
        </Div>
      </Wrapper>
    )
  );
};

export default connect(state => ({
  isAuthenticate: state.login,
}))(Dashboard);
