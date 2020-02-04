import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ListPostNavigation from './ListPostNavigation';
import { GET_ALL_POST_NAVIGATION_REQUEST, SEARCH_REQUEST, GET_POST_REQUEST } from './ducks';
import Post from './Post';
import { VISIBLE_MODAL, SIGN_OUT_USER } from '../../ducks';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  background: ghostwhite;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;

  .currentPage {
    color: steelblue;
    border-bottom: 2px solid steelblue;
  }

  > a {
    text-decoration: none;
    font-size: 30px;
    color: steelblue;
  }

  > button {
    padding: 5px;
    border: none;
    background: none;
    font-weight: bold;
    font-size: 17px;

    :hover {
      color: steelblue;
      cursor: pointer;
      border-bottom: 2px solid steelblue;
    }
  }

  span {
    input {
      padding: 5px 10px;
      border: 1px solid steelblue;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      width: 200px;
      transition: 200ms all;
    }
    input:focus {
      width: 300px;
    }
    button {
      padding: 5px;
      color: steelblue;
    }

    .button-avatar {
      font-size: 17px;
      border: 0;
      border-radius: 8px;
      margin-right: 5px;
    }
  }
`;
const Div = styled.div`
  display: flex;
  > ul {
    background: ghostwhite;
    margin-top: 1px;
    height: 95vh;
    overflow-y: scroll;
    position: fixed;
    width: 25%;
    top: 42px;

    > li {
      cursor: pointer;
    }
  }

  > div {
    margin-left: 25%;
  }
`;

const About = ({ ListPostAboutNavigation = [], currentUser, dispatch, history }) => {
  const [keySearch, setKeySearch] = useState('');
  const onSearchHandler = () => {
    dispatch({ type: SEARCH_REQUEST, payload: keySearch });
    history.push('/List-Search');
  };

  useEffect(() => {
    const partOfLink = window.location.href.split('/');

    if (
      partOfLink[partOfLink.length - 1] !== 'About' &&
      partOfLink[partOfLink.length - 1] !== 'Manuals'
    )
      window.localStorage.setItem('navActiveColor', null);
    if (
      partOfLink[partOfLink.length - 2] === 'About' ||
      partOfLink[partOfLink.length - 2] === 'Manuals'
    ) {
      dispatch({
        type: GET_POST_REQUEST,
        payload: {
          page: partOfLink[partOfLink.length - 2],
          name: partOfLink[partOfLink.length - 1],
        },
      });
      history.push(`/${partOfLink[partOfLink.length - 2]}/${partOfLink[partOfLink.length - 1]}`);
    }

    dispatch({
      type: GET_ALL_POST_NAVIGATION_REQUEST,
      payload: 'About',
    });
  }, []);

  const onLoginHandler = () => {
    dispatch({ type: VISIBLE_MODAL });
  };

  const onSignOutHandler = () => {
    window.localStorage.removeItem('username');
    dispatch({ type: SIGN_OUT_USER });
  };

  return (
    <div>
      <Nav>
        <a href="/">MONGO-LEARN</a>
        <button type="button" className="currentPage">
          GETTING STARTED
        </button>
        <button type="button" onClick={() => history.push('/Manuals')}>
          MANUAL DOCUMENT
        </button>
        <span>
          <input
            type="text"
            placeholder="Search.."
            value={keySearch}
            onChange={e => setKeySearch(e.target.value)}
          />
          <button type="button" onClick={() => onSearchHandler()}>
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </span>
        <span>
          {currentUser ? (
            <span>
              <button type="button" className="button-avatar" onClick={() => onLoginHandler()}>
                <i className="fa fa-envira" /> {currentUser.username}
              </button>
            </span>
          ) : (
            <button type="button" onClick={() => onLoginHandler()}>
              LOGIN
            </button>
          )}
          {currentUser && (
            <span>
              <button type="button" className="button-avatar" onClick={() => onSignOutHandler()}>
                Sign out
              </button>
            </span>
          )}
        </span>
      </Nav>
      <Div>
        <ListPostNavigation
          ListPostNavigation={ListPostAboutNavigation}
          page="About"
          history={history}
        />
        <Post />
      </Div>
    </div>
  );
};

export default connect(state => ({
  ListPostAboutNavigation: state.ListPostAboutNavigation,
  currentUser: state.currentUser,
}))(About);
