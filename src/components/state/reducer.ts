import { State } from './state';
import { User } from '../../types';

export type Action =
  | {
      type: 'SET_USER';
      payload: User | null;
    }
  | {
      type: 'SET_TOKEN';
      payload: string | null;
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER':
      return {
        loggedInUser: {
          ...state.loggedInUser,
          user: action.payload
        }
      };
    case 'SET_TOKEN':
      return {
        loggedInUser: {
          ...state.loggedInUser,
          token: action.payload
        }
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

export const setToken = (payload: string | null): Action => {
  return {
    type: 'SET_TOKEN',
    payload
  };
};
