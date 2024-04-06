import React from "react";
import { hydrate } from "react-dom";
import App from "./App.tsx";
import "./index.css";

hydrate(<App />, document.getElementById("root") as HTMLElement);
