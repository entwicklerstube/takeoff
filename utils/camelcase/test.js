import Camelcase from "./";

describe("Util - camelcase", () => {
  it("returns a string", () => {
    expect(typeof Camelcase()).toEqual("string");
  });

  it("returns pass string", () => {
    expect(Camelcase("hello")).toEqual("hello");
  });

  it("returns string replaced dash with camelcase", () => {
    expect(Camelcase("hello-world")).toEqual("helloWorld");
  });

  it("returns string replaced whitespace with camelcase", () => {
    expect(Camelcase("hello world")).toEqual("helloWorld");
  });

  it("returns string replaced multiple whitespace with camelcase", () => {
    expect(Camelcase("hello      world")).toEqual("helloWorld");
  });

  it("returns string replaced snake_case with camelcase", () => {
    expect(Camelcase("hello_world")).toEqual("helloWorld");
  });

  it("returns string replaced PascalCase with camelcase", () => {
    expect(Camelcase("HelloWorld")).toEqual("helloWorld");
  });

  it("returns string replaced uppercase with camelcase", () => {
    expect(Camelcase("HELLO WORLD")).toEqual("helloWorld");
  });

  it("returns string replaced lowercase with camelcase", () => {
    expect(Camelcase("hello world")).toEqual("helloWorld");
  });
});
