import { fork, put, call, takeLatest } from 'redux-saga/effects';
import { callApi, createAction, createReducer } from 'dorothy/utils';
import { GET_CURRENT_USER_RESPONSE, GET_CURRENT_USER_ERROR } from '../Admin/ducks';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

/* handler state for login */
function* requestLogin(action) {
  const { username, password, history } = action.payload;
  try {
    const response = yield call(
      callApi,
      'POST',
      `${process.env.REACT_APP_MAIN_URL}api/auth/login`,
      {
        username,
        password,
      },
    );

    if (response.data.success) {
      yield put(createAction(LOGIN_RESPONSE));
      window.localStorage.setItem('JWT', response.data.token);
      history.push('/dashboard');
    }
  } catch (error) {
    yield put(createAction(LOGIN_ERROR, error));
  }
}
function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, requestLogin);
}

const initLogin = null;
const loginActionHandler = {
  [LOGIN_RESPONSE]: () => true,
  [LOGIN_ERROR]: () => false,
  [GET_CURRENT_USER_RESPONSE]: () => true,
  [GET_CURRENT_USER_ERROR]: () => null,
};

export const loginReducer = createReducer(initLogin, loginActionHandler);
export const loginSaga = [fork(watchLoginRequest)];
