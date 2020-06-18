import React, { useReducer } from "react";

export const DataContext = React.createContext();

const dataContextInitialState = {};

const dataContextReducer = (state, (action) => {
  switch (action.type) {
    case ""
  }

});

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    dataContextReducer,
    dataContextInitialState
  );

  return (
    <dataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
