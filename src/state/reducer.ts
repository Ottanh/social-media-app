import { State } from './state';
import { SearchResult, User } from '../types';

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
      type: 'SET_SEARCH_RESULT';
      payload: SearchResult;
    }
  | {
      type: 'SET_STATE';
      payload: State;
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
    case 'SET_SEARCH_RESULT':
      return {
        ...state,
        searchResult: action.payload
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

export const setSearchResult = (payload: SearchResult): Action => {
  return {
    type: 'SET_SEARCH_RESULT',
    payload
  };
};

export const setState = (payload: State): Action => {
  return {
    type: 'SET_STATE',
    payload
  };
};