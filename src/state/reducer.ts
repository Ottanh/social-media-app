import { State } from './state';
import { Post, SearchResult, User } from '../types';

export type Action =
  | {
      type: 'SET_USER';
      payload: User | null;
    }
  | {
      type: 'SET_USER_LIKES';
      payload: string[];
    }
  | {
      type: 'SET_SEARCH_USER';
      payload: User[];
    }
  | {
      type: 'SET_SEARCH_POST';
      payload: Post[];
    }
  | {
      type: 'SET_STATE';
      payload: State;
    }
  | {
      type: 'ADD_POST';
      payload: Post;
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        loggedInUser: action.payload
      };
    case 'SET_USER_LIKES':
        if(!state.loggedInUser){
          throw new TypeError('User is null');
        }
        return {
          ...state,
          loggedInUser: {
            ...state.loggedInUser,
            likes: action.payload
            }
        };
    case 'SET_SEARCH_USER':
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          user: action.payload
        }
      };
    case 'SET_SEARCH_POST':
        return {
          ...state,
          searchResult: {
            ...state.searchResult,
            post: action.payload
          }
        };
    case 'ADD_POST':
      return {
        ...state,
        newPosts: state.newPosts.concat(action.payload)
      };
    default:
      return state;
  }
};

export const setUser = (payload: User | null): Action => {
  return {
    type: 'SET_USER',
    payload
  };
};

export const setUserLikes = (payload: string[]): Action => {
  return {
    type: 'SET_USER_LIKES',
    payload
  };
};

export const setSearchUser = (payload: User[]): Action => {
  return {
    type: 'SET_SEARCH_USER',
    payload
  };
};

export const setSearchPost = (payload: Post[]): Action => {
  return {
    type: 'SET_SEARCH_POST',
    payload
  };
};

export const setState = (payload: State): Action => {
  return {
    type: 'SET_STATE',
    payload
  };
};

export const addPost = (payload: Post): Action => {
  return {
    type: 'ADD_POST',
    payload
  };
};