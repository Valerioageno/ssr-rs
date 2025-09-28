import { hydrate } from "solid-js/web";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
hydrate(() => <App />, root);
