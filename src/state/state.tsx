import React, { createContext, useContext, useReducer } from 'react';
import { User } from '../types';

import { Action } from './reducer';

export type State = {
  loggedInUser: {
    token: string | null;
    user: User | null;
  }
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
export const useStateValue = () => useContext(StateContext);