import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import './index.css';

export const Index = () => {
  const app = renderToString(<App />);

  return (
 `<!doctype html>
  <html>
    <head>
      <title>React SSR</title>
      <link rel="stylesheet" href="./styles/ssr.css">
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
  </html>`
  );
};