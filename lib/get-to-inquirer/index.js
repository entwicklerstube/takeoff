/**
 * Pass some props, you will always get an inquirer valid question object
 * @param {Object} Will merge in questions, you can overwrite properties
 */
export const question = props => ({
  type: 'input',
  name: 'value',
  ...props
});

/**
 * Pass anything and you get an array full of promises containing inquirer valid questions
 * @param {*} Getters Pass anything and the function will built promises in array
 * @returns {array} Array of promises - resolves with inquirer questions
 */
const GetToInquirer = async getters => {
  const handleGetter = async getter => {
    const concatedGetter = [];

    for (const get of getter) {
      const constructor = get && get.constructor;

      switch (constructor) {
        case Date:
        case Number:
        case String: {
          const name = get; // re-assign get to name constant
          concatedGetter.push(async () => question({ name }));
          break;
        }

        case Array: {
          concatedGetter.push(...(await handleGetter(get)));
          break;
        }

        case Object: {
          const overwriteQuestion = get; // re-assign get to new question constant
          concatedGetter.push(async () => question(overwriteQuestion));
          break;
        }

        case Function: {
          const fn = get; // re-assign get to fn constant
          concatedGetter.push(async props => {
            const resolvedFn = fn(props);
            const resolvedGetter = await handleGetter([await resolvedFn]);
            const [getterResponse] = resolvedGetter;
            return await getterResponse();
          });
          break;
        }

        case Promise: {
          const resolvedPromise = await get;
          concatedGetter.push(...(await handleGetter([resolvedPromise])));
          break;
        }
      }
    }

    return concatedGetter;
  };

  return await handleGetter([getters]);
};

export default GetToInquirer;
