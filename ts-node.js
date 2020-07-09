const project =
  process.env.TS_NODE_PROJECT ||
  process.env._TS_PROJECT_PATH__ ||
  "./tsconfig.json";

require("ts-node").register({
  project,
  files: true,
});
