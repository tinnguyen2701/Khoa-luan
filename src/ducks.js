/*eslint-disable */
import { createReducer } from 'dorothy/utils';
import {
  GET_ALL_POST_ABOUT_RESPONSE,
  ADD_POST_ABOUT_RESPONSE,
  REMOVE_POST_ABOUT_RESPONSE,
  UPDATE_POST_ABOUT_RESPONSE,
  GET_ALL_POST_DOCUMENT_RESPONSE,
  ADD_POST_DOCUMENT_RESPONSE,
  REMOVE_POST_DOCUMENT_RESPONSE,
  UPDATE_POST_DOCUMENT_RESPONSE,
} from './components/Admin/ducks';
import {
  GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE,
  GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE,
  GET_POST_RESPONSE,
  VISIBLE_LOADING,
  SEARCH_RESPONSE,
  REGISTER_RESPONSE,
  LOGIN_USER_RESPONSE,
  LIKE_POST_USER_RESPONSE,
  UN_LIKE_POST_USER_RESPONSE,
  ADD_COMMENT_RESPONSE,
  DELETE_COMMENT_RESPONSE,
} from './components/Home/ducks';

export const UPDATE_FRAME_REQUEST = 'UPDATE_FRAME_REQUEST';
export const UPDATE_FRAME_RESPONSE = 'UPDATE_FRAME_RESPONSE';
export const UPDATE_FRAME_ERROR = 'UPDATE_FRAME_ERROR';

const initModal = { tabVisible: 0 };
const modalActionHandler = {
  [UPDATE_FRAME_REQUEST]: (state, action) => ({
    tabVisible: action.payload,
  }),
};
export const modalReducer = createReducer(initModal, modalActionHandler);

const postAboutInit = [];
const postAboutActionHandler = {
  [GET_ALL_POST_ABOUT_RESPONSE]: (state, action) => action.payload,
  [ADD_POST_ABOUT_RESPONSE]: (state, action) => [...state, action.payload],
  [UPDATE_POST_ABOUT_RESPONSE]: (state, action) => {
    return state.map(item => {
      if (item._id === action.payload.id) {
        item.name = action.payload.name;
        item.describe = action.payload.describe;
      }
      return item;
    });
  },
  [REMOVE_POST_ABOUT_RESPONSE]: (state, action) =>
    state.filter(item => item._id !== action.payload.id),
};
export const postAboutReducer = createReducer(postAboutInit, postAboutActionHandler);

const postDocumentInit = [];
const postDocumentActionHandler = {
  [GET_ALL_POST_DOCUMENT_RESPONSE]: (state, action) => action.payload,
  [ADD_POST_DOCUMENT_RESPONSE]: (state, action) => [...state, action.payload],
  [UPDATE_POST_DOCUMENT_RESPONSE]: (state, action) => {
    return state.map(item => {
      if (item._id === action.payload.id) {
        item.name = action.payload.name;
        item.describe = action.payload.describe;
        item.homeWork = action.payload.homeWork;
      }
      return item;
    });
  },
  [REMOVE_POST_DOCUMENT_RESPONSE]: (state, action) =>
    state.filter(item => item._id !== action.payload.id),
};
export const postDocumentReducer = createReducer(postDocumentInit, postDocumentActionHandler);

const listAboutNavigation = [];
const postAboutNavigationActionHandler = {
  [GET_ALL_POST_ABOUT_NAVIGATION_RESPONSE]: (state, action) => action.payload,
};
export const ListPostAboutNavigationReducer = createReducer(
  listAboutNavigation,
  postAboutNavigationActionHandler,
);

const listDocumentNavigation = [];
const postDocumentNavigationActionHandler = {
  [GET_ALL_POST_DOCUMENT_NAVIGATION_RESPONSE]: (state, action) => action.payload,
};
export const ListPostDocumentNavigationReducer = createReducer(
  listDocumentNavigation,
  postDocumentNavigationActionHandler,
);

const postInit = null;
const postActionHandler = {
  [GET_POST_RESPONSE]: (state, action) => action.payload,
  [LIKE_POST_USER_RESPONSE]: (state, action) => {
    return { ...state, favorites: action.payload };
  },
  [UN_LIKE_POST_USER_RESPONSE]: (state, action) => {
    return { ...state, favorites: action.payload };
  },
  [ADD_COMMENT_RESPONSE]: (state, action) => {
    return { ...state, comments: action.payload };
  },
  [DELETE_COMMENT_RESPONSE]: (state, action) => {
    return { ...state, comments: action.payload };
  },
};
export const PostReducer = createReducer(postInit, postActionHandler);

const isVisibleLoading = false;
const isVisibleLoadingActionHandler = {
  [VISIBLE_LOADING]: state => {
    return !state;
  },
};
export const isVisibleLoadingReducer = createReducer(
  isVisibleLoading,
  isVisibleLoadingActionHandler,
);

const searchPosts = null;
const searchPostsActionHandler = {
  [SEARCH_RESPONSE]: (state, action) => {
    return action.payload;
  },
};
export const SearchPostsReducer = createReducer(searchPosts, searchPostsActionHandler);

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
const currentUserInit = null;
const currentUserActionHandler = {
  [REGISTER_RESPONSE]: (state, action) => action.payload,
  [LOGIN_USER_RESPONSE]: (state, action) => action.payload,
  [SIGN_OUT_USER]: () => null,
};
export const currentUserReducer = createReducer(currentUserInit, currentUserActionHandler);

export const VISIBLE_MODAL = 'VISIBLE_MODAL';
const visibleModalInit = false;
const visibleModalActionHandler = {
  [VISIBLE_MODAL]: state => !state,
};
export const visibleModalReducer = createReducer(visibleModalInit, visibleModalActionHandler);
