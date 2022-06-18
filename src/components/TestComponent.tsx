import * as React from 'react';
import { GlobalContext, useFlash } from '../App';

export const TestComponent = (props: {}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const { global, setGlobal } = React.useContext(GlobalContext);
  const [local, setLocal] = React.useState(0);

  useFlash(rootRef, [global, local]);

  return (
    <div ref={rootRef} className="island">
      <h3>👋 I'm an island</h3>
      <div data-type="props">
        <b>Props</b>
        {''}
        <pre>{JSON.stringify(props)}</pre>
      </div>
      <div data-type="global">
        <b>Global context</b>
        {''}
        <pre>{JSON.stringify({ global })}</pre>
        <div className="line" />
        <button onClick={() => setGlobal(global - 1)}>-</button>
        <button onClick={() => setGlobal(global + 1)}>+</button>
      </div>
      <div data-type="local">
        <b>Local state</b>
        {''}
        <pre>{JSON.stringify({ local })}</pre>
        <div className="line" />
        <button onClick={() => setLocal(local - 1)}>-</button>
        <button onClick={() => setLocal(local + 1)}>+</button>
      </div>
    </div>
  );
};
