# Create React App boilerplate

This example is made using <a href="https://create-react-app.dev/" target="_blank">create-react-app</a> boilerplate with the typescipt `--template` flag.

From the initial scaffolding project there are the following diffrences: 

```json
// package.json

//[...]

    "scripts": {
        //[...]
        "build:ssr": "npx webpack --config ./webpack.config.js --progress",
        //[...]
    }

//[...]

  "devDependencies": {
        "clean-webpack-plugin": "^4.0.0-alpha.0",
        "css-loader": "^5.2.2",
        "file-loader": "^6.2.0",
        "mini-css-extract-plugin": "^1.5.0",
        "webpack-cli": "^4.6.0"
  }

//[...]
```

```javascript
// src/ssrEntry.tsx

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

```

## 🚧 Important

Every time you use `yarn start` or `npm run start` the tsconfig.json file is updated; to use `yarn build:ssr` or `npm run build:ssr` you have to set the "noEmit" variable to false.