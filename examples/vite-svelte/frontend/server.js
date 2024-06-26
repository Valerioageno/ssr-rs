import App from './App.svelte';

export function render() {
  const { html, css } = App.render();
  return JSON.stringify({ html, css: css.code });
}
