import React, { useReducer } from "react";

export const DataContext = React.createContext();

const dataContextInitialState = {
  data: {},
  container: {
    user: null,
    isNew: null,
    vehicle: null,
    miles: null,
  },
};

const dataContextReducer = (state, action) => {
  switch (action.type) {
    case "setLogin":
      return {
        ...state,
        container: {
          ...state.container,
          user: action.value.user,
          isNew: action.value.isNew,
        },
      };

    case "setVehicleInfo":
      return {
        ...state,
        container: {
          ...state.container,
          vehicle: {
            year: action.value.year,
            make: action.value.make,
            model: action.value.model,
          },
          miles: action.value.miles,
        },
      };

    case "isNotNew": {
      return {
        ...state,
        container: {
          ...state.container,
          isNew: false,
        },
      };
    }

    case "updateCurrentMiles": {
      // Update the current miles of the vehicle
      return {
        ...state,
        container: {
          ...state.container,
          miles: action.value.currentMiles,
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

    case "logout":
      return dataContextInitialState;

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
