import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { AppState } from "../../redux/store";
import { increment, incrementWithInput } from "../../redux/slices/counterSlice";

export default function Counter() {
  const [userInput, setUserInput] = useState(0);

  const dispatch = useDispatch();
  // state/store: useSelector
  const counterValue = useSelector(
    (state: AppState) => state.counter.counterValue
  );
  console.log(counterValue, "value");

  // onChange to get userInput
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(Number(event.target.value));
  }

  // function
  // use increment action
  function incrementHandler() {
    // trigger action increment
    dispatch(increment());
  }

  // function with action
  function incrementHandlerWithInput() {
    dispatch(incrementWithInput(userInput));
  }
  return (
    <div>
      <h1> Counter</h1>
      <button onClick={incrementHandler}> +</button>
      <p> Value: {counterValue} </p>

      <input type="number" onChange={onChangeHandler} />
      <button onClick={incrementHandlerWithInput}> + with userInput</button>
      <p> Value with user input: </p>
    </div>
  );
}
