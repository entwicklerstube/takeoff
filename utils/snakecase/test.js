import SnakeCase from "./";

describe("Util - SnakeCase", () => {
  it("returns a string", () => {
    expect(SnakeCase(), "to be a string");
  });

  it("returns string replaced dash", () => {
    expect(SnakeCase("hello-world"), "to equal", "hello_world");
  });

  it("returns string replaced whitespace", () => {
    expect(SnakeCase("hello world"), "to equal", "hello_world");
  });

  it("returns string replaced snake_case", () => {
    expect(SnakeCase("hello_world"), "to equal", "hello_world");
  });

  it("returns string replaced camelCase", () => {
    expect(SnakeCase("helloWorld"), "to equal", "hello_world");
  });

  it("returns string replaced uppercase", () => {
    expect(SnakeCase("HELLO WORLD"), "to equal", "hello_world");
  });
});
