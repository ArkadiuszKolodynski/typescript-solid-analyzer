import React, { createContext, useReducer } from "react";

const initialState = { authenticated: false, user: null };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "init": {
        console.log("initial state", action);
        const newState = action.payload;
        return newState;
      }
      case "login": {
        const newState = {
          ...state,
          authenticated: true,
          user: action.payload,
        };
        return newState;
      }
      case "logout": {
        const newState = { ...state, authenticated: false, user: null };
        return newState;
      }
      case "repositories": {
        const newState = { ...state, repositories: action.payload };
        return newState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
