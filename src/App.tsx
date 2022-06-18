import * as React from 'react';
import './style.css';
import { IslandsRenderer } from './IslandsRenderer';
// import { TestComponent } from './components/TestComponent';
// import { AnotherComponent } from './components/AnotherComponent';

const TestComponent = React.lazy(() =>
  import('./components/TestComponent').then((module) => ({
    default: module.TestComponent,
  }))
);
const AnotherComponent = React.lazy(() =>
  import('./components/AnotherComponent').then((module) => ({
    default: module.AnotherComponent,
  }))
);

// explicitly name the components as workaround for minification
// const islands = {
//   Test: TestComponent,
//   Test2: TestComponent, // not mounted
//   Another: AnotherComponent,
//   Another2: AnotherComponent, // not mounted
// };

interface GlobalContextInterface {
  global: number;
  setGlobal: React.Dispatch<React.SetStateAction<number>>;
}
export const GlobalContext = React.createContext<GlobalContextInterface>({
  global: 0,
  setGlobal: () => {},
});

export default function App() {
  const [global, setGlobal] = React.useState(0);
  // ideally should be using suspense and lazy to support code-splitting
  return (
    <React.Fragment>
      <GlobalContext.Provider value={{ global, setGlobal }}>
        <IslandsRenderer fallback="loading......">
          <TestComponent componentIslandName="Test" />
          <AnotherComponent componentIslandName="Another" />
        </IslandsRenderer>
      </GlobalContext.Provider>
    </React.Fragment>
  );
}

export function useFlash(
  rootRef: React.RefObject<HTMLElement>,
  [globalState, localeState]: [number, number]
) {
  const DURATION = 500;

  function logFlash(stateType: 'global' | 'local', stateValue: number) {
    console.log(`[ ${stateType} ]: ${JSON.stringify(stateValue)}`);
  }

  function flashDOMNode(node: HTMLElement | null) {
    if (!node) return;
    const flashFrames = new KeyframeEffect(
      node,
      [
        { background: 'var(--flashColor)', easing: 'ease-in' },
        { background: 'var(--flashColor)', offset: 0.4, easing: 'linear' },
        { background: 'transparent', easing: 'ease-out' },
      ],
      { duration: DURATION, fill: 'forwards' }
    );
    const flashAnimation = new Animation(flashFrames, document.timeline);
    flashAnimation.play();
  }

  React.useEffect(() => {
    if (rootRef?.current) {
      flashDOMNode(rootRef.current.querySelector('[data-type="global"]'));
    }
  }, [globalState]);

  React.useEffect(() => {
    if (rootRef?.current) {
      flashDOMNode(rootRef.current.querySelector('[data-type="local"]'));
    }
  }, [localeState]);
}
