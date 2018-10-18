import Camelcase from "./";

describe("Util - camelcase", () => {
  it("returns a string", () => {
    expect(Camelcase(), "to be a string");
  });

  it("returns string replaced dash with camelcase", () => {
    expect(Camelcase("hello-world"), "to equal", "helloWorld");
  });

  it("returns string replaced whitespace with camelcase", () => {
    expect(Camelcase("hello world"), "to equal", "helloWorld");
  });

  it("returns string replaced snake_case with camelcase", () => {
    expect(Camelcase("hello_world"), "to equal", "helloWorld");
  });

  it("returns string replaced PascalCase with camelcase", () => {
    expect(Camelcase("HelloWorld"), "to equal", "helloWorld");
  });

  it("returns string replaced uppercase with camelcase", () => {
    expect(Camelcase("HELLO WORLD"), "to equal", "helloWorld");
  });
});
