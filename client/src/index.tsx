import React from 'react';
import { render, hydrate } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const mockProps = {
  params: ['first param', 'second param', 'third param'],
};

const props = (() => {
  const stateHolder = window as { __INITIAL_PROPS__?: any };
  const ssrState = stateHolder.__INITIAL_PROPS__;

  if (ssrState) {
    //delete stateHolder.__INITIAL_PROPS__;
    return ssrState;
  }
  return mockProps;
})();

if (process.env.NODE_ENV !== 'production') {
  render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
} else {
  // We might have the element already
  let el = document.getElementById('root');
  if (el) {
    hydrate(<App {...props} />, el);

    reportWebVitals();
  } else {
    // otherwise set up an observer
    const observer = new MutationObserver((mutations, obs) => {
      if (el) {
        hydrate(<App {...props} />, el);

        reportWebVitals();
        obs.disconnect();
        return;
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
}
