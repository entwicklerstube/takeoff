import SnakeCase from "./";

describe("Util - SnakeCase", () => {
  it("returns a string", () => {
    expect(typeof SnakeCase()).toEqual("string");
  });

  it("returns pass string", () => {
    expect(SnakeCase("hello")).toEqual("hello");
  });

  it("returns string replaced dash with snake_case", () => {
    expect(SnakeCase("hello-world")).toEqual("hello_world");
  });

  it("returns string replaced whitespace with snake_case", () => {
    expect(SnakeCase("hello world")).toEqual("hello_world");
  });

  it("returns string replaced multiple whitespace with snake_case", () => {
    expect(SnakeCase("hello      world")).toEqual("hello_world");
  });

  it("returns string replaced snake_case with snake_case", () => {
    expect(SnakeCase("hello_world")).toEqual("hello_world");
  });

  it("returns string replaced snake_case with snake_case", () => {
    expect(SnakeCase("HelloWorld")).toEqual("hello_world");
  });

  it("returns string replaced uppercase with snake_case", () => {
    expect(SnakeCase("HELLO WORLD")).toEqual("hello_world");
  });

  it("returns string replaced lowercase with snake_case", () => {
    expect(SnakeCase("hello world")).toEqual("hello_world");
  });
});
