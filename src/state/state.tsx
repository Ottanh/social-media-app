import React, { createContext, useContext, useReducer } from 'react';
import { SearchResult, User } from '../types';
import { Action } from './reducer';

export type State = {
  loggedInUser: {
    token: string | null;
    user: User | null;
  },
  searchResult: SearchResult;
};

const initialState: State = {
  loggedInUser: {
    token: localStorage.getItem('sma-user-token'),
    user: (() => {
      const storedUser = localStorage.getItem('sma-user');
      if(storedUser){
        return JSON.parse(storedUser);
      }
    })()
  },
  searchResult: {
    users: [],
    posts: []
   }
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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


export const useStateValue = () => useContext(StateContext);