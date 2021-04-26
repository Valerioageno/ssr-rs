# Create React App boilerplate

This example is made using <a href="https://create-react-app.dev/" target="_blank">create-react-app</a> boilerplate with the typescript `--template` flag.

From the initial scaffolding project there are the following diffrences: 

```json
// package.json

//[...]

    "scripts": {
        //[...]
          "build:all": "webpack --config ./webpack.client.build.js --progress && webpack --config ./webpack.ssr.js --progress",
          "build:client": "webpack --config ./webpack.client.build.js --progress",
          "build:ssr": "webpack --config ./webpack.ssr.js --progress",
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
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import './index.css';

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

```

## 🚧 Important

Every time you use `yarn start` or `npm run start` the tsconfig.json file is updated; to use `yarn build:ssr` or `npm run build:ssr` you have to set the "noEmit" variable to false.