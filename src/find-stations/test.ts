import { expect } from "chai";
import { hello } from ".";

it("sd work", () => {
  expect(hello()).to.equal("hey");
});
