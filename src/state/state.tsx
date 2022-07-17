import React, { createContext, useContext, useReducer } from 'react';
import { Post, SearchResult, User } from '../types';
import { Action } from './reducer';

export type State = {
  loggedInUser: User | null;
  searchResult: SearchResult;
  newPosts: Post[];
};

const initialState: State = {
  loggedInUser: (() => {
      const storedUser = localStorage.getItem('sma-user');
      if(storedUser){
        return JSON.parse(storedUser);
      }
    })(),
  searchResult: {
    user: [],
    post: []
  },
  newPosts: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  mockState?: State;
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  mockState,
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, mockState ? mockState : initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

interface MockState {
  mockState: State;
  reducer: React.Reducer<State, Action>;
  children: JSX.Element;
  debug?: boolean;
}

/*
export const MockState = ({ mockState, reducer, children, debug = false }: MockState) => {
  const [state, dispatch] = useReducer(reducer, mockState);

  if(debug){
    console.log(state);
  }

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
*/

export const useStateValue = () => useContext(StateContext);