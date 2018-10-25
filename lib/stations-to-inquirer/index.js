import inquirer from "inquirer";

/**
 * Pass the "get" from a station and we translate it to a question
 * @param {*} get
 * @returns {array} Valid inquirer question object in array (a get can contain multiple questions)
 */
export const getToQuestions = get => {
  let buildQuestions = [];
  const getConstructor = get ? get.constructor : false;

  const buildQuestion = (props = {}) => ({
    type: "input",
    name: props.name,
    ...props
  });

  switch (true) {
    case getConstructor === String:
      {
        buildQuestions = buildQuestions.concat(buildQuestion({ name: get }));
      }
      break;

    case getConstructor === Array: {
      buildQuestions = buildQuestions.concat(
        ...get.map(getItem => getToQuestions(getItem))
      );
      break;
    }

    case getConstructor === Object: {
      buildQuestions = buildQuestions.concat([buildQuestion(get)]);
      break;
    }

    case getConstructor === Function: {
      buildQuestions = buildQuestions.concat(getToQuestions(get()));
      break;
    }
  }

  return buildQuestions;
};

/**
 * Pass the stations and StationsToInquirer will start interactive prompts
 * @param {array} Stations
 */
const StationsToInquirer = async get => {
  const inquirerQuestions = getToQuestions(get);

  // Idea, make each "question" from "inquirerQuestions" a function so we can call it here with extra props

  await inquirer.prompt([
    {
      type: "input",
      name: "firstname"
    }
  ]);
};

export default StationsToInquirer;
