import inquirer from "inquirer";

/**
 * Pass the "get" from a station and we translate it to a question
 * @param {*} get
 * @returns {array} Valid inquirer question object in array (a get can contain multiple questions)
 */
export const getToQuestions = get => {
  const buildQuestions = [];
  const getConstructor = get ? get.constructor : false;

  switch (true) {
    case getConstructor === String: {
      buildQuestions.push({
        type: "input",
        name: get
      });
    }
  }

  return buildQuestions;
};

/**
 * Pass the stations and StationsToInquirer will start interactive prompts
 * @param {array} Stations
 */
const StationsToInquirer = async () => {
  const foo = await inquirer.prompt([
    {
      name: "foobar",
      description: "lol"
    },
    {
      name: "hey"
    }
  ]);

  // console.log(foo);
};

export default StationsToInquirer;
