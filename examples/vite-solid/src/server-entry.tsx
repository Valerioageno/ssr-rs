import { generateHydrationScript, renderToString } from "solid-js/web";
import App from "./App";

export const Index = () => {
  const html = renderToString(() => <App />);
  const hydrationScript = generateHydrationScript();

  // Parse this on rust-side before returning the html.
  return JSON.stringify({
    html,
    hydrationScript,
  });
};
