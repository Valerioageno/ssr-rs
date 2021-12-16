# Create React App boilerplate

This example is made using <a href="https://create-react-app.dev/" target="_blank">create-react-app</a> boilerplate with the typescript `--template` flag.

We then pulled out the "react-scripts" dependencies in order to update to Webpack 5.65.0 and replaced it with Parcel for quick development bundling.

From the initial scaffolding project there are the following differences:

```json
// package.json

//[...]

    "scripts": {
        //[...]
          "start": "parcel",
          "test": "jest",
          "build:all": "webpack --config ./webpack.client.build.js --progress && webpack --config ./webpack.ssr.js --progress",
          "build:client": "webpack --config ./webpack.client.build.js --progress",
          "build:ssr": "webpack --config ./webpack.ssr.js --progress",
        //[...]
    }

//[...]

  "devDependencies": {
          "ts-jest": "^27.1.1",
          "jest": "^27.4.5",
          "clean-webpack-plugin": "^4.0.0-alpha.0",
          "css-loader": "^5.2.2",
          "file-loader": "^6.2.0",
          "mini-css-extract-plugin": "^1.5.0",
          "parcel": "^2.0.1",
          "webpack": "^5.65.0",
          "webpack-cli": "^4.6.0"
  }

//[...]
```

```typescript
// src/ssrEntry.tsx

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import './index.css';

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
      ${renderToStaticMarkup(
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_PROPS__ =${params}`,
          }}
        />
      )}
      <div id="root">${app}</div>
    </body>
  </html>`;
};
```

We also make a change to the hydration process to support html streaming

```typescript
// src/index.tsx

//[...]
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

//[...]
```

## Preparing for SSR

Ensure that you run `yarn build:all` or `npm run build:all` to prepare the dist files needed for the `ssr-rs` server
