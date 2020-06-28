import React, { useReducer } from "react";

export const DataContext = React.createContext();

const dataContextInitialState = { data: {}, container: { save: false } };

const dataContextReducer = (state, action) => {
  switch (action.type) {
    case "initialize": {
      return {
        ...state,
        container: {
          ...state.container,
          currentMiles: action.value.currentMiles,
          car: action.value.car,
        },
      };
    }

    case "updateCurrentMiles": {
      // Update the current miles of the vehicle
      return {
        ...state,
        container: {
          ...state.container,
          currentMiles: action.value.currentMiles,
        },
      };
    }

    case "update":
      // Update task info in specific interval if it has been updated
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
