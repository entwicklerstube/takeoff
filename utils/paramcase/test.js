import ParamCase from "./";

describe("Util - ParamCase", () => {
  it("returns a string", () => {
    expect(ParamCase(), "to be a string");
  });

  it("returns string replaced dash", () => {
    expect(ParamCase("hello-world"), "to equal", "hello-world");
  });

  it("returns string replaced whitespace", () => {
    expect(ParamCase("hello world"), "to equal", "hello-world");
  });

  it("returns string replaced snake_case", () => {
    expect(ParamCase("hello_world"), "to equal", "hello-world");
  });

  it("returns string replaced PascalCase", () => {
    expect(ParamCase("HelloWorld"), "to equal", "hello-world");
  });

  it("returns string replaced uppercase", () => {
    expect(ParamCase("HELLO WORLD"), "to equal", "hello-world");
  });
});
