interface Mock {
  get: string;
  exec: () => void;
}

export const simpleStation: Mock = {
  get: "name",
  exec: () => {
    return undefined;
  },
};

export const wrongStation: { hello: string } = {
  hello: "world",
};
