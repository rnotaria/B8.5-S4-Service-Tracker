import React, { useReducer } from "react";

export const DataContext = React.createContext();

const dataContextInitialState = {};

const dataContextReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return { ...state, [action.value.miles]: { ...action.value } };

    default:
      return dataContextInitialState;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    dataContextReducer,
    dataContextInitialState
  );

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
