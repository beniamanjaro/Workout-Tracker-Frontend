import { createContext, useReducer } from "react";
import { ENABLE_HAMBURGER_MENU, DISABLE_HAMBURGER_MENU } from "./actionTypes";

const initialState = {
  isHamburgerMenuVisible: true,
};

export const HamburgerMenuContext = createContext(initialState);

const HamburgerMenuReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case ENABLE_HAMBURGER_MENU:
      return {
        isHamburgerMenuVisible: true,
      };
    case DISABLE_HAMBURGER_MENU:
      return {
        isHamburgerMenuVisible: false,
      };
    default:
      return state;
  }
};

export const HamburgerMenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HamburgerMenuReducer, initialState);

  return (
    <HamburgerMenuContext.Provider
      value={{
        isHamburgerMenuVisible: state.isHamburgerMenuVisible,
        dispatch,
      }}
    >
      {children}
    </HamburgerMenuContext.Provider>
  );
};
