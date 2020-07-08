import React, { useReducer } from "react";
import { db } from "../Firebase/firebase";

export const DataContext = React.createContext();

const dataContextInitialState = {
  data: {},
  status: null,
  container: {
    user: null,
    vehicle: null,
    miles: 0,
  },
};

const dataContextReducer = (state, action) => {
  switch (action.type) {
    case "logout":
      return dataContextInitialState;

    case "setUser":
      // action.value
      return {
        ...state,
        container: {
          ...state.container,
          user: action.value,
        },
      };

    case "setGuest":
      // action.value: none
      return {
        ...dataContextInitialState,
        isNew: true,
        container: {
          ...state.container,
          user: "guest",
        },
      };

    case "setCreateAccount":
      // action.value
      return {
        ...dataContextInitialState,
        isNew: true,
        container: {
          ...state.container,
          user: action.value,
        },
      };

    case "setVehicleInfo":
      // action.value: {year, make, model, miles}

      // Update database if not guest account
      if (state.container.user !== "guest") {
        db.collection("users")
          .doc(state.container.user)
          .update({
            miles: action.value.miles,
            vehicle: {
              make: action.value.make,
              model: action.value.model,
              year: action.value.year,
            },
          });
      }

      return {
        ...state,
        container: {
          ...state.container,
          vehicle: {
            make: action.value.make,
            model: action.value.model,
            year: action.value.year,
          },
          miles: action.value.miles,
        },
      };

    case "updateCurrentMiles": {
      // action.value

      // Update database if not guest account
      if (state.container.user !== "guest") {
        db.collection("users")
          .doc(state.container.user)
          .update({
            miles: action.value,
          })
          .then(() => {
            console.log("Miles successfully updated");
          })
          .catch((e) => {
            console.log("Error: ", e);
          });
      }

      return {
        ...state,
        container: {
          ...state.container,
          miles: action.value,
        },
      };
    }

    case "updateData":
      // Update task info in specific interval if it has been updated
      return {
        ...state,
        data: {
          ...state.data,
          [action.value.miles]: {
            tasks: action.value.tasks,
            columns: action.value.columns,
            columnOrder: action.value.columnOrder,
          },
        },
      };

    case "setUsed":
      return {
        ...state,
        isNew: false,
      };

    case "setStatus":
      return {
        ...state,
        status: action.value,
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
