import 'egg';

declare module 'egg' {
  interface Context {
    isIOS: boolean;
  }
}
