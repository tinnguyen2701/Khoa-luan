import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SEARCH_REQUEST } from './ducks';
import { SIGN_OUT_USER } from '../../ducks';

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

  .search-area {
    border-bottom: 1px solid #bbb;
    input {
      border: none;
      background: none;
      color: #bbb;
      font-size: 17px;
      outline: none;
      width: 200px;
      transition: 250ms all;
    }

    input:focus {
      width: 300px;
    }
    button {
      padding: 5px;
      color: #bbb;
      outline: none;
    }
  }

  .user-area {
    button {
      background: -webkit-linear-gradient(bottom, #ff7575, #b224ef);
      border: none;
      color: white;
      border-radius: 5px;
      outline: none;
      padding: 7px 14px;
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
  padding-left: 20px;
  padding-top: 50px;
  button {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin: 25px 10px;
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 1px solid steelblue;
    border-left: 1px solid steelblue;
    width: 97%;
    outline: none;
  }
  img {
    width: 64px;
    height: 64px;
  }
`;

const searchPosts = ({ listSearch, isVisibleLoading, currentUser, dispatch, history }) => {
  const [keySearch, setKeySearch] = useState('');

  const onClickHandler = (name, page) => {
    window.localStorage.setItem('navActiveColor', name);
    history.push(`/${page}/${name}`);
  };

  const onSearchHandler = () => {
    dispatch({ type: SEARCH_REQUEST, payload: keySearch });
    history.push('/List-Search');
  };

  const onSignOutHandler = () => {
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('JWT');
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
        <span className="search-area">
          <input
            type="text"
            placeholder="What're we looking for ?"
            value={keySearch}
            onChange={e => setKeySearch(e.target.value)}
          />
          <button
            type="button"
            style={{ background: 'none', border: 'none', fontSize: '17px' }}
            onClick={() => onSearchHandler()}
          >
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </span>
        <span className="user-area">
          {currentUser ? (
            <span>
              <button type="button" className="button-avatar" onClick={() => {}}>
                <i className="fa fa-user" /> {currentUser.username}
              </button>
            </span>
          ) : (
            <button type="button" onClick={() => {}}>
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
        List Post found:
        {listSearch &&
          listSearch.length > 0 &&
          listSearch.map((item, index) => (
            <div key={index.toString()}>
              <button type="button" onClick={() => onClickHandler(item.name, item.page)}>
                <img
                  src="https://stackjava.com/wp-content/uploads/2018/07/mongodb-250x250.png"
                  alt="post"
                />
                {item.name}
              </button>
            </div>
          ))}
        {isVisibleLoading && <p>Waitting...</p>}
        {listSearch && listSearch.length === 0 && <p>Not Found Result!</p>}
      </Div>
    </div>
  );
};

export default connect(state => ({
  listSearch: state.searchPosts,
  isVisibleLoading: state.isVisibleLoading,
  currentUser: state.currentUser,
}))(searchPosts);
