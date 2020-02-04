import React, { useState } from 'react';
import styled from 'styled-components';
import store from 'store';
import { connect } from 'react-redux';
import { LOGIN_REQUEST } from './ducks';

const OverlayWrapper = styled.div`
  form {
    width: 450px;
    min-height: 500px;
    height: auto;
    border-radius: 5px;
    margin: 2% auto;
    box-shadow: 0 9px 50px hsla(20, 67%, 75%, 0.31);
    padding: 2%;
    background-image: linear-gradient(-225deg, #e3fdf5 50%, #ffe6fa 50%);
  }
  form .con {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  header {
    margin: 2% auto 10% auto;
    text-align: center;
  }
  header h2 {
    font-size: 250%;
    color: #3e403f;
  }
  header p {
    letter-spacing: 0.05em;
  }
  .input-item {
    background: #fff;
    color: #333;
    padding: 14.5px 0px 15px 9px;
    border-radius: 5px 0px 0px 5px;
    padding-right: 10px;
  }
  input[class='form-input'] {
    width: 240px;
    height: 50px;

    margin-top: 2%;
    padding: 15px;

    font-size: 16px;
    color: #5e6472;
    outline: none;
    border: none;
    border-radius: 0px 5px 5px 0px;
    transition: 0.2s linear;
  }
  input[id='txt-input'] {
    width: 250px;
  }
  input:focus {
    transform: translateX(-2px);
    border-radius: 5px;
  }

  button {
    display: inline-block;
    color: #252537;

    width: 280px;
    height: 50px;

    padding: 0 20px;
    background: #fff;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;
    margin: 7% auto;
    letter-spacing: 0.05em;
  }
  .submits {
    width: 48%;
    display: inline-block;
    float: left;
    margin-left: 2%;
  }
  button:hover {
    transform: translatey(3px);
    box-shadow: none;
  }

  button:hover {
    animation: ani9 0.4s ease-in-out infinite alternate;
  }
  @keyframes ani9 {
    0% {
      transform: translateY(3px);
    }
    100% {
      transform: translateY(5px);
    }
  }
`;

const Login = ({ history, isAuthenticate }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({ type: LOGIN_REQUEST, payload: { username, password, history } });
  };

  return (
    <OverlayWrapper>
      <div className="overlay">
        <form onSubmit={e => onSubmitHandler(e)}>
          {isAuthenticate === false && (
            <p style={{ color: 'rgb(230, 70, 46)' }}>Email or password was wrong!</p>
          )}
          <div className="con">
            <header className="head-form">
              <h2>Log In</h2>
              <p>login here using your username and password</p>
            </header>
            <br />
            <div className="field-set">
              <span className="input-item">username</span>
              <input
                className="form-input"
                id="txt-input"
                type="text"
                placeholder="@UserName"
                required
                value={username || ''}
                onChange={e => setUsername(e.target.value)}
              />
              <br />
              <span className="input-item">password</span>
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                id="pwd"
                name="password"
                required
                value={password || ''}
                onChange={e => setPassword(e.target.value)}
              />
              <br />
              <button className="log-in" type="submit">
                {' '}
                Log In{' '}
              </button>
            </div>
          </div>
        </form>
      </div>
    </OverlayWrapper>
  );
};

export default connect(state => ({
  isAuthenticate: state.login,
}))(Login);
