import PascalCase from "./";

describe("Util - PascalCase", () => {
  it("returns a string", () => {
    expect(PascalCase(), "to be a string");
  });

  it("returns string replaced dash", () => {
    expect(PascalCase("hello-world"), "to equal", "HelloWorld");
  });

  it("returns string replaced whitespace", () => {
    expect(PascalCase("hello world"), "to equal", "HelloWorld");
  });

  it("returns string replaced snake_case", () => {
    expect(PascalCase("hello_world"), "to equal", "HelloWorld");
  });

  it("returns string replaced camelCase", () => {
    expect(PascalCase("helloWorld"), "to equal", "HelloWorld");
  });

  it("returns string replaced uppercase", () => {
    expect(PascalCase("HELLO WORLD"), "to equal", "HelloWorld");
  });
});
