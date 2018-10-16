import PascalCase from "./";

describe("Util - PascalCase", () => {
  it("returns a string", () => {
    expect(typeof PascalCase()).toEqual("string");
  });

  it("returns pass string", () => {
    expect(PascalCase("hello")).toEqual("Hello");
  });

  it("returns string replaced dash with pascalcase", () => {
    expect(PascalCase("hello-world")).toEqual("HelloWorld");
  });

  it("returns string replaced whitespace with pascalcase", () => {
    expect(PascalCase("hello world")).toEqual("HelloWorld");
  });

  it("returns string replaced multiple whitespace with pascalcase", () => {
    expect(PascalCase("hello      world")).toEqual("HelloWorld");
  });

  it("returns string replaced snake_case with pascalcase", () => {
    expect(PascalCase("hello_world")).toEqual("HelloWorld");
  });

  it("returns string replaced PascalCase with pascalcase", () => {
    expect(PascalCase("HelloWorld")).toEqual("HelloWorld");
  });

  it("returns string replaced uppercase with pascalcase", () => {
    expect(PascalCase("HELLO WORLD")).toEqual("HelloWorld");
  });

  it("returns string replaced lowercase with pascalcase", () => {
    expect(PascalCase("hello world")).toEqual("HelloWorld");
  });
});
