import './hmr';
import './main.css';
import App from './App.svelte';
import { Buffer } from 'buffer';

globalThis.Buffer = Buffer;

const app = new App({
  target: document.body,
});

export default app;
