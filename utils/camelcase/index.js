import { camel } from 'change-case';

/**
 * Convert the case-type of a string to camelCase
 * @import `import { camelCase } from 'takeoff/utils')`
 * @example
 * const camelCase = require('takeoff/utils');
 * camelCase('hello-world')
 * // => helloWorld
 */
export const Camelcase = camel;

export default Camelcase;
