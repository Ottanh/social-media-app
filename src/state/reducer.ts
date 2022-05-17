import { State } from "./state";
import { User } from "../types";

export type Action =
  | {
      type: "SET_USER";
      payload: User;
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: User): Action => {
  return {
    type: 'SET_USER',
    payload
  };
};
