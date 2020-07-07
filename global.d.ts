import { expect } from 'chai';

declare global {
  namespace NodeJS {
    interface Global {
      expect: typeof expect;
    }
  }
}
