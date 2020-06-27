import React, { useReducer } from "react";

export const DataContext = React.createContext();

const dataContextInitialState = { data: {}, container: { save: false } };

const dataContextReducer = (state, action) => {
  switch (action.type) {
    case "updateCurrentMiles": {
      return {
        ...state,
        container: {
          ...state.container,
          currentMiles: action.value.currentMiles,
        },
      };
    }

    case "update":
      return {
        ...state,
        data: {
          ...state.data,
          [action.value.miles]: { ...action.value },
        },
      };

    case "deleteInterval":
      delete state.data[action.value];
      return state;

    default:
      return state;
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
