import React from "react";
import "./styles.css";

const MyContext = React.createContext();

function Provider({ children }) {
  console.log("provider render");
  const [state, setState] = React.useState("Yes!");
  return (
    <MyContext.Provider value={[state, setState]}>
      {children}
    </MyContext.Provider>
  );
}

function ChildrenWrapper({ children }) {
  const ref = React.useRef(0);
  React.useEffect(() => {
    console.log("children wrapper render count:", ref.current);
  });

  return (
    <div>
      <p>
        I am the children wrapper, and the direct child of the context provider.
        I rendered {++ref.current} times
      </p>
      {children}
    </div>
  );
}

function Consumer() {
  const ref = React.useRef(0);
  const [state, setState] = React.useContext(MyContext);

  return (
    <div>
      <span>
        I am a consumer, I rendered {++ref.current} times, the state value is :{" "}
        {state}
      </span>
      <br />
      <br />
      <button onClick={() => setState(old => old + "Yes!")}>Add a Yes!</button>
    </div>
  );
}

export default function App() {
  const [, rerender] = React.useState(0);
  return (
    <div>
      <Provider>
        <ChildrenWrapper>
          <Consumer />
        </ChildrenWrapper>
      </Provider>
      <br />
      <button onClick={() => rerender(old => old + 1)}>Rerender Parent</button>
    </div>
  );
}
