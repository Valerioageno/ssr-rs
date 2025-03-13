import { hydrate } from "svelte";

import App from "./App.svelte";
import "./app.css";

hydrate(App, {
  target: document.querySelector("#svelte-app"),
});
