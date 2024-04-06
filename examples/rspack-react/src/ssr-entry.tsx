import "fast-text-encoding"; // Mandatory for React18
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export const Index = (params: string | undefined) => {
  const props = params ? JSON.parse(params) : {};
  const app = renderToString(<App {...props} />);

  return `<!doctype html>
  <html>
    <head>
      <title>React SSR</title>
      <link rel="stylesheet" href="./styles/ssr.css">
      <script async src="./scripts/bundle.js"></script>
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
  </html>`;
};
