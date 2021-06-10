import { useState, useEffect, useReducer } from "react";
import soundFile from "./res/sounds/ineedmoney.mp3";

function NumberInput({ id, type, value, onInputChange, children, isDisabled }) {
  return (
    <form>
      <label htmlFor="step">
        {children}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
          disabled={isDisabled}
        />
      </label>
    </form>
  );
}

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "RESET":
      return { ...state, count: 0 };
    default:
      throw new Error(`Unhandled action ${action.type} in counterReducer`);
  }
};

const initialCounterState = {
  count: 0,
  step: 1,
};

function Counter({ initialStep, onCount, isDisabled }) {
  //const [count, setCount] = useState(0);
  //const [step, setStep] = useState(initialStep ?? 10);
  const [counterState, dispatchCounter] = useReducer(counterReducer, {
    ...initialCounterState,
    step: initialStep,
  });

  const handleReset = () => {
    dispatchCounter({ type: "RESET" });
  };

  const handleIncrement = () => {
    dispatchCounter({ type: "INCREMENT" });
    onCount((cur) => Number(cur) + 1);
  };
  const handleDecrement = () => {
    dispatchCounter({ type: "DECREMENT" });
    onCount((cur) => Number(cur) + 1);
  };

  const handleStepChange = (e) => {
    dispatchCounter({ type: "SET_STEP", step: Number(e.target.value) });
  };

  return (
    <>
      <p>my counter is at: {counterState.count}</p>
      <button onClick={handleIncrement} disabled={isDisabled}>
        +
      </button>
      <button onClick={handleDecrement} disabled={isDisabled}>
        -
      </button>
      <button onClick={handleReset} disabled={isDisabled}>
        Reset
      </button>
      <NumberInput
        id="step"
        type="number"
        value={counterState.step}
        onInputChange={handleStepChange}
        isDisabled={isDisabled}
      >
        step:{" "}
      </NumberInput>
    </>
  );
}

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialValue);

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

function App() {
  const [nbOp, setNbOp] = useLocalStorage("nbOp", 0);
  const [isDisabled, setIsDisabled] = useState(false);

  const clearLocalStorage = () => {
    setNbOp(0);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (nbOp > 20) {
      const disable = async () => {
        setIsDisabled(true);
        try {
          const audio = new Audio(soundFile);
          await audio.play();
        } catch (e) {
          console.log(e);
        }
      };
      disable();
    }
  }, [nbOp]);

  return (
    <>
      {console.log("%cCounter rendered", "color: green")}
      <h1>Hello HardFork</h1>
      <p>nb operations: {nbOp}</p>
      {nbOp > 20 && (
        <>
          <h3 style={{ color: "red" }}>
            You have reachead the limit, please&nbsp;
            <a
              href={
                "https://thephnompen.files.wordpress.com/2012/02/i-am-not-a-scammer-he-is.jpg"
              }
            >
              PAY
            </a>
          </h3>
          <button onClick={clearLocalStorage}>clear local storage</button>
        </>
      )}
      <Counter initialStep={1} onCount={setNbOp} isDisabled={isDisabled} />
    </>
  );
}

export default App;
