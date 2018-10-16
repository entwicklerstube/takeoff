import ParamCase from "./";

describe("Util - ParamCase", () => {
  it("returns a string", () => {
    expect(typeof ParamCase()).toEqual("string");
  });

  it("returns pass string", () => {
    expect(ParamCase("hello")).toEqual("hello");
  });

  it("returns string replaced whitespace with paramcase", () => {
    expect(ParamCase("hello world")).toEqual("hello-world");
  });

  it("returns string replaced multiple whitespace with paramcase", () => {
    expect(ParamCase("hello      world")).toEqual("hello-world");
  });

  it("returns string replaced snake_case with paramcase", () => {
    expect(ParamCase("hello_world")).toEqual("hello-world");
  });

  it("returns string replaced camelcase with paramcase", () => {
    expect(ParamCase("HelloWorld")).toEqual("hello-world");
  });

  it("returns string replaced uppercase with paramcase", () => {
    expect(ParamCase("HELLO WORLD")).toEqual("hello-world");
  });

  it("returns string replaced lowercase with paramcase", () => {
    expect(ParamCase("hello world")).toEqual("hello-world");
  });
});
