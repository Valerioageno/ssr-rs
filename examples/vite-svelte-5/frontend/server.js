import { render as renderer } from "svelte/server";
import App from "./App.svelte";

export function render() {
  const { head, body } = renderer(App);
  return JSON.stringify({ head, body });
}
