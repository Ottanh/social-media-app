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
      type: 'SET_TOKEN';
      payload: string | null;
    }
  | {
      type: 'SET_SEARCH_RESULT';
      payload: SearchResult;
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          user: action.payload
        }
      };
    case 'SET_USER_LIKES':
        if(!state.loggedInUser.user){
          throw new TypeError('User is null');
        }
        return {
          ...state,
          loggedInUser: {
            ...state.loggedInUser,
            user: {
              ...state.loggedInUser.user,
              likes: action.payload
            }
          }
        };
    case 'SET_TOKEN':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          token: action.payload
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

export const setToken = (payload: string | null): Action => {
  return {
    type: 'SET_TOKEN',
    payload
  };
};

export const setSearchResult = (payload: SearchResult): Action => {
  return {
    type: 'SET_SEARCH_RESULT',
    payload
  };
};