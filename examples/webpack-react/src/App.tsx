import React, { useState } from 'react';
import './App.css';
import loadable from '@loadable/component';

const Logo = loadable(() => import('./Async'));

interface Props {
  params: string[];
}

function App(props: Props | undefined) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => setCount(count + 1)}>{count}</button>

        {props?.params ? (
          <div className="paramsContainer">
            <ul>
              {props?.params?.map((elem, i) => (
                <li key={i}>{elem}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
