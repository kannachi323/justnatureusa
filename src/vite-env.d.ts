/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface TurnOptions {
  width?: number;
  height?: number;
  autoCenter?: boolean;
  // add more options here as needed
}

declare module 'jquery' {
  interface JQuery {
    turn(options?: TurnOptions): JQuery;
  }
}
