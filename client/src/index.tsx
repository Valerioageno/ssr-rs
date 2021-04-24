import React from 'react';
import {render, hydrate} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const mockProps = {
  params: [
    "first param",
    "second param",
    "third param"
  ]
}

const props = (() => {
  const stateHolder = (window as { __INITIAL_PROPS__?: string });
  const ssrState = stateHolder.__INITIAL_PROPS__;

  if (ssrState) {
    //delete stateHolder.__INITIAL_PROPS__;
    return JSON.parse(ssrState);
  }
  return mockProps;
})();



if(process.env.NODE_ENV !== 'production') {

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

}else{
  hydrate(<App {...props} />,document.getElementById("root"))
  
}


