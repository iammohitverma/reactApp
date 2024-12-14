import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "Increment":
      return {
        ...state,
        count: state.count < 10 ? state.count + 1 : state.count,
      };

    case "Decrement":
      return {
        ...state,
        count: state.count > 0 ? state.count - 1 : state.count,
      };

    case "Reset":
      return { ...state, count: 0 };

    default:
      return state;
  }
};

export const UseReducerComp = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 }); // Initial state is an object

  return (
    <div className="box">
      <p>{state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: "Increment" });
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch({ type: "Decrement" });
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          dispatch({ type: "Reset" });
        }}
      >
        Reset
      </button>
    </div>
  );
};
