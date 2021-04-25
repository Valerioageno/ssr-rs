import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import './index.css';


//Initial function to call from the server
export const Index = (params: string | undefined) => {
  
  const props = params ? JSON.parse(params) : {};
  const app = renderToString(<App {...props} />);

  return (
 `<!doctype html>
  <html>
    <head>
      <title>React SSR</title>
      <link rel="stylesheet" href="./styles/ssr.css">
      <script async src="./scripts/bundle.js"></script>
    </head>
    <body>
      ${renderToStaticMarkup(<script dangerouslySetInnerHTML={{__html: `window.__INITIAL_PROPS__ =${params}`}}/>)}
      <div id="root">${app}</div>
    </body>
  </html>`
  );
};