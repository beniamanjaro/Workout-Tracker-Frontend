import { createContext, useReducer } from "react";
import workoutPlans from "../services/workoutPlans";
import {
  WORKOUT_PLANS_REQUEST,
  WORKOUT_PLANS_SUCCESS,
  WORKOUT_PLANS_FAIL,
  REMOVE_WORKOUT_PLAN,
  ADD_WORKOUT_PLAN,
} from "./actionTypes";

const initialState = {
  workoutPlans: [],
  loading: true,
  error: null,
};

export const WorkoutPlansContext = createContext(initialState);

const WorkoutPlansReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case WORKOUT_PLANS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WORKOUT_PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        workoutPlans: payload,
      };
    case WORKOUT_PLANS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlans: [...state.workoutPlans, payload],
      };
    case REMOVE_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlans: state.workoutPlans.filter((wp) => wp.id != payload),
      };
    default:
      return state;
  }
};

export const WorkoutPlansContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutPlansReducer, initialState);

  return (
    <WorkoutPlansContext.Provider
      value={{
        workoutPlans: state.workoutPlans,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </WorkoutPlansContext.Provider>
  );
};
