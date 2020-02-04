import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, logger } from 'dorothy/utils';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_RESPONSE = 'GET_CURRENT_USER_RESPONSE';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_ABOUT_RESPONSE = 'ADD_POST_ABOUT_RESPONSE';
export const ADD_POST_ABOUT_ERROR = 'ADD_POST_ABOUT_ERROR';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_ABOUT_RESPONSE = 'REMOVE_POST_ABOUT_RESPONSE';
export const REMOVE_POST_ABOUT_ERROR = 'REMOVE_POST_ABOUT_ERROR';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_ABOUT_RESPONSE = 'UPDATE_POST_ABOUT_RESPONSE';
export const UPDATE_POST_ABOUT_ERROR = 'UPDATE_POST_ABOUT_ERROR';

export const GET_ALL_POST_REQUEST = 'GET_ALL_POST_REQUEST';
export const GET_ALL_POST_ABOUT_RESPONSE = 'GET_ALL_POST_ABOUT_RESPONSE';
export const GET_ALL_POST_ABOUT_ERROR = 'GET_ALL_POST_ABOUT_ERROR';

export const ADD_POST_DOCUMENT_RESPONSE = 'ADD_POST_DOCUMENT_RESPONSE';
export const ADD_POST_DOCUMENT_ERROR = 'ADD_POST_DOCUMENT_ERROR';

export const REMOVE_POST_DOCUMENT_RESPONSE = 'REMOVE_POST_DOCUMENT_RESPONSE';
export const REMOVE_POST_DOCUMENT_ERROR = 'REMOVE_POST_DOCUMENT_ERROR';

export const UPDATE_POST_DOCUMENT_RESPONSE = 'UPDATE_POST_DOCUMENT_RESPONSE';
export const UPDATE_POST_DOCUMENT_ERROR = 'UPDATE_POST_DOCUMENT_ERROR';

export const GET_ALL_POST_DOCUMENT_RESPONSE = 'GET_ALL_POST_DOCUMENT_RESPONSE';
export const GET_ALL_POST_DOCUMENT_ERROR = 'GET_ALL_POST_DOCUMENT_ERROR';

/* handler state for get current user */
function* requestCurrentUser(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/auth/currentUser`,
      action.payload,
    );
    if (response.status === 200) {
      yield put(createAction(GET_CURRENT_USER_RESPONSE, response));
    }
  } catch (error) {
    logger.logError('invalid token');
    window.location.href = `${process.env.REACT_APP_MAIN_URL}login`;
  }
}
function* watchCurrentUserRequest() {
  yield takeLatest(GET_CURRENT_USER_REQUEST, requestCurrentUser);
}
export const currentUserSaga = [fork(watchCurrentUserRequest)];

/* add post */
function* requestAddPost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/posts/add`,
      action.payload,
    );
    if (response.status === 200) {
      if (action.payload.page === 'About')
        yield put(createAction(ADD_POST_ABOUT_RESPONSE, response.data));
      else yield put(createAction(ADD_POST_DOCUMENT_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the them');
  }
}
function* watchAddPostRequest() {
  yield takeLatest(ADD_POST_REQUEST, requestAddPost);
}
export const addPostSaga = [fork(watchAddPostRequest)];

/* remove post */
function* requestRemovePost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/posts/remove`,
      action.payload,
    );
    if (response.status === 200) {
      if (action.payload.item === 'About')
        yield put(createAction(REMOVE_POST_ABOUT_RESPONSE, response.data));
      else yield put(createAction(REMOVE_POST_DOCUMENT_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the xoa');
  }
}
function* watchRemovePostRequest() {
  yield takeLatest(REMOVE_POST_REQUEST, requestRemovePost);
}
export const removePostSaga = [fork(watchRemovePostRequest)];

/* update post */
function* requestUpdatePost(action) {
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/posts/update`,
      action.payload,
    );
    if (response.status === 200) {
      if (action.payload.item === 'About')
        yield put(createAction(UPDATE_POST_ABOUT_RESPONSE, response.data));
      else yield put(createAction(UPDATE_POST_DOCUMENT_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the chinh sua');
  }
}
function* watchUpdatePostRequest() {
  yield takeLatest(UPDATE_POST_REQUEST, requestUpdatePost);
}
export const updatePostSaga = [fork(watchUpdatePostRequest)];

/* all post */
function* requestGetAllPost(action) {
  try {
    const response = yield call(
      callApi,
      'GET',
      `${process.env.REACT_APP_MAIN_URL}api/posts?item=${action.payload}`,
      action.payload,
    );
    if (response.status === 200) {
      if (action.payload === 'About')
        yield put(createAction(GET_ALL_POST_ABOUT_RESPONSE, response.data));
      else yield put(createAction(GET_ALL_POST_DOCUMENT_RESPONSE, response.data));
    }
  } catch (error) {
    logger.logError('khong the lay tat ca bai post');
  }
}
function* watchAllPostRequest() {
  yield takeLatest(GET_ALL_POST_REQUEST, requestGetAllPost);
}
export const allPostSaga = [fork(watchAllPostRequest)];
