/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  LOGIN_USER_REQUEST,
  LIKE_POST_USER_REQUEST,
  UN_LIKE_POST_USER_REQUEST,
  ADD_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
} from './ducks';
import { VISIBLE_MODAL } from '../../ducks';

const Div = styled.div`
  padding-left: 40px;
  padding-top: 60px;
  padding-bottom: 60px;
  padding-right: 20px;
  opacity: ${props => (props.isVisibleLoading ? '0.2' : '1')};

  .your-answer,
  .answer {
    width: 100%;
    height: 150px;
    padding: 10px;
  }

  .button-test {
    margin: 10px 10px 10px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 5px;
  }
`;

const DefaultContent = styled.div`
  padding-left: 40px;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-right: 20px;
`;

const Favorite = styled.div`
  width: 100%;
  background: ghostwhite;
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding: 10px 0;

  button {
    padding: 3px 15px;
    font-size: 20px;
    margin-right: 20px;
    cursor: pointer;
    background: none;
    border: none;
    :hover i {
      color: steelblue;
    }
    .fa-thumbs-o-up {
    }
  }
`;

const FavoriteIcon = styled.i`
  color: ${props => (props.favorited ? 'steelblue' : 'black')};
}
`;

const Register = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;

  .button-close {
    position: absolute;
    top: 17%;
    right: 5%;
    font-size: 31px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 200px;
    span {
      color: white;
      margin: 10px 0;
    }
    input {
      padding: 5px;
      width: 140%;
      border-radius: 5px;
      border: none;
    }
    button {
      margin-top: 40px;
      width: 100px;
      padding: 5px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

const Comment = styled.div`
  textarea {
    width: 100%;
    margin-top: 20px;
    height: 100px;
    font-size: 16px;
    padding: 10px;
    outline: none;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
  button {
    background: ghostwhite;
    border: none;
    padding: 8px 10px;
    border-radius: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const ListComment = styled.div`
  margin-top: 20px;

  > div {
    margin-top: 15px;
  }

  p {
    white-space: pre-line;
    padding-left: 15px;
    background: ghostwhite;
    border-radius: 5px;
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  i {
    font-size: 25px;
    color: steelblue;
  }

  .span-name {
    font-size: 25px;
    color: steelblue;
  }

  .span-time {
    float: right;
    color: darkgray;
  }

  .delete-comment {
    position: absolute;
    top: 4px;
    right: 5px;
    color: indianred;
    padding: 0;
    margin: 0;
  }
`;

const Post = ({ post, isVisibleLoading, visibleModal, currentUser, dispatch }) => {
  const [visibleTest, setVisibleTest] = useState(false);
  const [visibleResult, setVisibleResult] = useState(false);
  const [answer, setAnswer] = useState('');
  const [yourAnswer, setYourAnswer] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');

  const onTestHandler = answer => {
    setVisibleTest(true);
    setAnswer(answer);
    setVisibleResult(false);
  };

  const checkAnswerHandler = () => {
    setVisibleResult(true);
  };

  const closeHandler = () => {
    setVisibleTest(false);
    setVisibleResult(false);
    setYourAnswer('');
  };

  const LikePostHandler = id => {
    if (currentUser == null) {
      dispatch({ type: VISIBLE_MODAL });
    } else {
      if (post.favorites.indexOf(currentUser.username) > -1) {
        dispatch({
          type: UN_LIKE_POST_USER_REQUEST,
          payload: {
            id,
            username: currentUser.username,
            item: window.location.href.split('/')[window.location.href.split('/').length - 2],
          },
        });
      } else
        dispatch({
          type: LIKE_POST_USER_REQUEST,
          payload: {
            id,
            username: currentUser.username,
            item: window.location.href.split('/')[window.location.href.split('/').length - 2],
          },
        });
    }
  };
  const onAddCommentHandler = (e, id) => {
    e.preventDefault();
    if (currentUser == null) {
      dispatch({ type: VISIBLE_MODAL });
    } else {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        payload: {
          id,
          username: currentUser.username,
          comment,
          item: window.location.href.split('/')[window.location.href.split('/').length - 2],
        },
      });
      setComment('');
    }
  };

  const deleteCommentHandler = (postId, commentId) => {
    dispatch({
      type: DELETE_COMMENT_REQUEST,
      payload: {
        postId,
        commentId,
        item: window.location.href.split('/')[window.location.href.split('/').length - 2],
      },
    });
  };

  const onRegister = e => {
    e.preventDefault();
    dispatch({ type: REGISTER_REQUEST, payload: { username, password } });
  };

  const onLogin = e => {
    e.preventDefault();
    dispatch({ type: LOGIN_USER_REQUEST, payload: { username, password } });
  };

  const closeVisibleRegisterHandler = () => {
    dispatch({ type: VISIBLE_MODAL });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {post && (
        <Div isVisibleLoading={isVisibleLoading}>
          <p style={{ color: 'steelblue', fontSize: '30px' }}>{post.name}</p>
          <p style={{ color: 'steelblue', fontSize: '14px', marginBottom: '20px' }}>
            {new Date(post.updated_at).toLocaleString()}
          </p>
          <div className="Container" dangerouslySetInnerHTML={{ __html: post.describe }}></div>
          {post.homeWork && (
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '24px' }}>Home Work</p>
              {post.homeWork.map((item, index) => (
                <div key={index.toString()}>
                  {index + 1}. {item.question}{' '}
                  <button
                    className="button-test"
                    type="button"
                    onClick={() => onTestHandler(item.answer)}
                  >
                    Test your answer
                  </button>
                </div>
              ))}
            </div>
          )}
          {visibleTest && (
            <div>
              <p style={{ fontSize: '24px' }}>Test Code</p>
              <textarea
                className="your-answer"
                value={yourAnswer}
                onChange={e => setYourAnswer(e.target.value)}
              />
              <button className="button-test" type="button" onClick={() => checkAnswerHandler()}>
                Check Answer
              </button>
              <button className="button-test" type="button" onClick={() => closeHandler()}>
                Close
              </button>
              {visibleResult && <textarea className="answer" readOnly value={answer} />}
            </div>
          )}
          <Favorite>
            <span>
              <button type="button" onClick={() => LikePostHandler(post._id)}>
                <FavoriteIcon
                  className="fa fa-thumbs-o-up"
                  favorited={currentUser && post.favorites.indexOf(currentUser.username) > -1}
                />
              </button>
            </span>
            <span>
              {currentUser && post.favorites.indexOf(currentUser.username) > -1 && (
                <span>Your liked and </span>
              )}
              {currentUser && post.favorites.indexOf(currentUser.username) > -1 && (
                <span>{post.favorites.length - 1} </span>
              )}
              {currentUser && post.favorites.indexOf(currentUser.username) < 0 && (
                <span>{post.favorites.length} </span>
              )}
              {currentUser == null && <span>{post.favorites.length} </span>}
              {post.favorites.length > 1 ? (
                <span>another persons </span>
              ) : (
                <span>person </span>
              )}{' '}
              like this post
            </span>
          </Favorite>
          <Comment>
            <form onSubmit={e => onAddCommentHandler(e, post._id)}>
              <textarea
                value={comment}
                placeholder="add comment.."
                onChange={e => setComment(e.target.value)}
              />
              <button type="submit">Comment</button>
            </form>
            <ListComment>
              {post.comments.length > 0 &&
                post.comments.map((comment, index) => (
                  <div key={index.toString()}>
                    <i className="fa fa-envira" />
                    <span className="span-name">{comment.username}</span>
                    <span className="span-time">
                      {new Date(comment.updated_at).toLocaleString()}
                    </span>
                    <p>
                      {comment.comment}
                      {currentUser != null && currentUser.username == comment.username && (
                        <button
                          className="delete-comment"
                          type="button"
                          onClick={() => deleteCommentHandler(post._id, comment._id)}
                        >
                          X
                        </button>
                      )}
                    </p>
                  </div>
                ))}
            </ListComment>
          </Comment>
        </Div>
      )}
      {window.location.href.split('/')[window.location.href.split('/').length - 2] != 'About' &&
        window.location.href.split('/')[window.location.href.split('/').length - 2] != 'Manuals' &&
        window.location.href.split('/')[window.location.href.split('/').length - 1] != 'About' &&
        window.location.href.split('/')[window.location.href.split('/').length - 1] !=
          'Manuals' && (
          <DefaultContent>
            <img
              src="https://viblo.asia/uploads/f920b42c-1347-4295-a120-69b1f3b76236.png"
              alt="image-logo"
            />
            <p style={{ fontSize: '30px', marginTop: '20px' }}>I. Giới thiệu về MongoDB</p>
            <p style={{ fontSize: '22px' }}>1. Khái niệm</p>
            <p>
              MongoDB là một chương trình cơ sở dữ liệu mã nguồn mở được thiết kế theo kiểu hướng
              đối tượng trong đó các bảng được cấu trúc một cách linh hoạt cho phép các dữ liệu lưu
              trên bảng không cần phải tuân theo một dạng cấu trúc nhất định nào. Chính do cấu trúc
              linh hoạt này nên MongoDB có thể được dùng để lưu trữ các dữ liệu có cấu trúc phức tạp
              và đa dạng và không cố định (hay còn gọi là Big Data).
            </p>
            <p style={{ fontSize: '22px' }}>
              2. Lợi thế của MongoDB so với các cơ sở dữ liệu dạng quan hệ(RDBMS)
            </p>
            <ul style={{ paddingLeft: '50px' }}>
              <li>
                Ít Schema hơn: MongoDB là một cơ sở dữ liệu dựa trên Document, trong đó một
                Collection giữ các Document khác nhau. Số trường, nội dung và kích cỡ của Document
                này có thể khác với Document khác.
              </li>
              <li>Cấu trúc của một đối tượng là rõ ràng.</li>
              <li>Không có các Join phức tạp.</li>
              <li>
                Khả năng truy vấn sâu hơn. MongoDB hỗ trợ các truy vấn động trên các Document bởi sử
                dụng một ngôn ngữ truy vấn dựa trên Document mà mạnh mẽ như SQL.
              </li>
              <li>MongoDB dễ dàng để mở rộng.</li>
              <li>
                Việc chuyển đổi/ánh xạ của các đối tượng ứng dụng đến các đối tượng cơ sở dữ liệu là
                không cần thiết.
              </li>
              <li>
                Sử dụng bộ nhớ nội tại để lưu giữ phần công việc, giúp truy cập dữ liệu nhanh hơn.
              </li>
            </ul>
            <p style={{ fontSize: '22px' }}>3. Một số đặc điểm của MongoDB</p>
            <ul style={{ paddingLeft: '50px' }}>
              <li>Kho lưu định hướng Document: Dữ liệu được lưu trong các tài liệu kiểu JSON.</li>
              <li>Lập chỉ mục trên bất kỳ thuộc tính nào.</li>
              <li>Các truy vấn đa dạng.</li>
              <li>Cập nhật nhanh hơn.</li>
            </ul>
          </DefaultContent>
        )}
      {(window.location.href.split('/')[window.location.href.split('/').length - 2] == 'About' ||
        window.location.href.split('/')[window.location.href.split('/').length - 2] == 'Manuals') &&
        post == null && <DefaultContent>Waitting..</DefaultContent>}
      {visibleModal && (
        <Register>
          <div>
            <form onSubmit={e => onRegister(e)}>
              <p style={{ color: 'steelblue', fontSize: '35px' }}>R E G I S T E R</p>
              <span>Username</span>
              <input value={username} onChange={e => setUsername(e.target.value)} />
              <span>Password</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="submit">Register</button>
            </form>
          </div>
          <div>
            <form onSubmit={e => onLogin(e)}>
              <p style={{ color: 'steelblue', fontSize: '35px' }}>L O G I N</p>
              <span>Username</span>
              <input value={username} onChange={e => setUsername(e.target.value)} />
              <span>Password</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="submit">Login</button>
            </form>
          </div>
          <button
            className="button-close"
            type="button"
            onClick={() => closeVisibleRegisterHandler()}
          >
            X
          </button>
        </Register>
      )}
    </div>
  );
};

export default connect(state => ({
  post: state.post,
  isVisibleLoading: state.isVisibleLoading,
  visibleModal: state.visibleModal,
  currentUser: state.currentUser,
}))(Post);
