import App from './App.svelte';

const app = new App({
  target: document.querySelector('#svelte-app'),
  hydrate: true
});

export default app;
