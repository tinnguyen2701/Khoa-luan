/* eslint-disable */
import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, logger } from 'dorothy/utils';
import { VISIBLE_MODAL } from '../../ducks';

export const GET_ALL_POST_NAVIGATION_REQUEST = 'GET_ALL_POST_NAVIGATION_REQUEST';
export const GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE = 'GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE';
export const GET_ALL_POST_ABOUT_NAVIGATION_ERROR = 'GET_ALL_POST_ABOUT_NAVIGATION_ERROR';
export const GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE =
  'GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE';
export const GET_ALL_POST_DOCUMENT_NAVIGATION_ERROR = 'GET_ALL_POST_DOCUMENT_NAVIGATION_ERROR';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_RESPONSE = 'GET_POST_RESPONSE';
export const GET_POST_ERROR = 'GET_POST_ERROR';

export const VISIBLE_LOADING = 'VISIBLE_LOADING';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_RESPONSE = 'SEARCH_RESPONSE';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_RESPONSE = 'REGISTER_RESPONSE';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LIKE_POST_USER_REQUEST = 'LIKE_POST_USER_REQUEST';
export const LIKE_POST_USER_RESPONSE = 'LIKE_POST_USER_RESPONSE';
export const LIKE_POST_USER_ERROR = 'LIKE_POST_USER_ERROR';

export const UN_LIKE_POST_USER_REQUEST = 'UN_LIKE_POST_USER_REQUEST';
export const UN_LIKE_POST_USER_RESPONSE = 'UN_LIKE_POST_USER_RESPONSE';
export const UN_LIKE_POST_USER_ERROR = 'UN_LIKE_POST_USER_ERROR';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_RESPONSE = 'ADD_COMMENT_RESPONSE';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_RESPONSE = 'DELETE_COMMENT_RESPONSE';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

/* all post navigation */
function* requestGetAllPostNavigation(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/postsNavigation?item=${action.payload}`,
      action.payload,
    );
    if (response.status === 200) {
      if (action.payload === 'About')
        yield put(createAction(GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE, response.data));
      else yield put(createAction(GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the lay tat ca bai post navigation');
  }
}
function* watchAllPostNavigationRequest() {
  yield takeLatest(GET_ALL_POST_NAVIGATION_REQUEST, requestGetAllPostNavigation);
}
export const allPostNavigationSaga = [fork(watchAllPostNavigationRequest)];

/* get post */
function* requestGetPost(action) {
  try {
    yield put(createAction(VISIBLE_LOADING));
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/posts/post?item=${action.payload.page}&&name=${action.payload.name}`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(VISIBLE_LOADING));
      yield put(createAction(GET_POST_RESPONSE, response.data));
    }
  } catch (error) {
    yield put(createAction(VISIBLE_LOADING));
    logger.logError('khong the lay bai post');
  }
}
function* watchPostRequest() {
  yield takeLatest(GET_POST_REQUEST, requestGetPost);
}
export const postSaga = [fork(watchPostRequest)];

/* search post */
function* requestSearchPost(action) {
  try {
    yield put(createAction(SEARCH_RESPONSE, null));
    yield put(createAction(VISIBLE_LOADING));
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/posts/search?name=${action.payload}`,
    );
    if (response.status === 200) {
      yield put(createAction(VISIBLE_LOADING));
      yield put(createAction(SEARCH_RESPONSE, response.data));
    }
  } catch (error) {
    yield put(createAction(VISIBLE_LOADING));
    logger.logError('khong the search bai post');
  }
}
function* watchSearchPostRequest() {
  yield takeLatest(SEARCH_REQUEST, requestSearchPost);
}
export const searchPostSaga = [fork(watchSearchPostRequest)];

/* register user */
function* requestRegisterUser(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/users/register`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(REGISTER_RESPONSE, response.data));
      yield put(createAction(VISIBLE_MODAL));
    }
  } catch (error) {
    logger.logError('khong the register user');
  }
}
function* watchRegisterUserRequest() {
  yield takeLatest(REGISTER_REQUEST, requestRegisterUser);
}
export const registerUserSaga = [fork(watchRegisterUserRequest)];

/* login user */
function* requestLoginUser(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/users/login`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(LOGIN_USER_RESPONSE, response.data));
      window.localStorage.setItem('username', response.data.username);
      yield put(createAction(VISIBLE_MODAL));
    }
  } catch (error) {
    logger.logError('khong the Login user');
  }
}
function* watchLoginUserRequest() {
  yield takeLatest(LOGIN_USER_REQUEST, requestLoginUser);
}
export const LoginUserSaga = [fork(watchLoginUserRequest)];

/* like post */
function* requestLikePost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/users/like`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(LIKE_POST_USER_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the like post');
  }
}
function* watchLikePostRequest() {
  yield takeLatest(LIKE_POST_USER_REQUEST, requestLikePost);
}
export const likePostSaga = [fork(watchLikePostRequest)];

/* un like post */
function* requestUnLikePost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/users/unlike`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(UN_LIKE_POST_USER_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the un like post');
  }
}
function* watchUnLikePostRequest() {
  yield takeLatest(UN_LIKE_POST_USER_REQUEST, requestUnLikePost);
}
export const unLikePostSaga = [fork(watchUnLikePostRequest)];

/* add comment post */
function* requestAddCommentPost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/users/addComment`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(ADD_COMMENT_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the add comment');
  }
}
function* watchAddCommentPostRequest() {
  yield takeLatest(ADD_COMMENT_REQUEST, requestAddCommentPost);
}
export const addCommentPostSaga = [fork(watchAddCommentPostRequest)];

/* delete comment post */
function* requestDeleteCommentPost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/users/deleteComment`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(DELETE_COMMENT_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the delete comment');
  }
}
function* watchDeleteCommentPostRequest() {
  yield takeLatest(DELETE_COMMENT_REQUEST, requestDeleteCommentPost);
}
export const deleteCommentPostSaga = [fork(watchDeleteCommentPostRequest)];
