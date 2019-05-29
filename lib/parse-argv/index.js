import { camel } from 'change-case';

/**
 * Parse process argument values (argv)
 * @param {array} process.argv
 * @returns {object}
 */
export const ParseArgv = (argv = []) => {
  let command;
  const flags = {};
  const props = {};

  let nextArgIsFlagValueForFlag = undefined;

  argv.forEach((arg, index) => {
    // skip bin and executed file
    if (index <= 1) return;

    // handle flags
    const argIsFlag = arg.slice(0, 2) === '--' && arg[2] !== '-';
    const argWithoutDash = arg.slice(2);

    if (argIsFlag && nextArgIsFlagValueForFlag) {
      nextArgIsFlagValueForFlag = undefined;
    }

    if (nextArgIsFlagValueForFlag && flags[nextArgIsFlagValueForFlag]) {
      flags[nextArgIsFlagValueForFlag] = arg;
      nextArgIsFlagValueForFlag = undefined;
    }

    if (argIsFlag) {
      flags[camel(argWithoutDash)] = true;
      nextArgIsFlagValueForFlag = camel(argWithoutDash);
    }

    // handle props
    const argIsProp = arg.includes('=');

    if (argIsProp) {
      const [name, value] = arg.split('=');

      props[name] = value;
    }

    // handle command
    if (!argIsFlag && !argIsProp && !command) {
      command = arg;
    }
  });

  return { command, props, flags };
};

export default ParseArgv;
