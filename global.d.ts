import chai from "chai";

declare global {
  namespace NodeJS {
    interface Global {
      expect: typeof chai.expect;
    }
  }

  const expect: typeof chai.expect;
}
