import { createStore } from "redux";

const counterReducer = (state = { count: 0, totalCount: 0 }, action) => {
  if (action.type === "increment") {
    if (state.count + 1 === action.totalAmount) {
      return {
        count: 0,
        totalCount: state.totalCount + 1,
      };
    } else {
      return {
        ...state,
        count: state.count + 1,
      };
    }
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
