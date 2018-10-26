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

  // Capsle functions so we can execute them in runtime with props
  // also fetch the first returned item to get build a question
  const functionWrapper = fn => props => getToQuestions(fn(props))[0];

  switch (true) {
    case getConstructor === String: {
      {
        buildQuestions = buildQuestions.concat(buildQuestion({ name: get }));
      }
      break;
    }

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
      buildQuestions = buildQuestions.concat([functionWrapper(get)]);
      break;
    }
  }

  return buildQuestions;
};

/**
 * Pass the detected stations and it will return the inquirer-conform prompt-array to give the user a selection
 * @param {array} Stations
 * @returns {array} InquirerConform list of prompts
 */
const stationSelection = () => {};

/**
 * Pass the stations and StationsToInquirer will start interactive prompts
 * @param {array} Stations
 */
const StationsToInquirer = async stations => {
  const inquirerStationQuestions = stationSelection(stations);

  /*
    const inquirerGetQuestions = getToQuestions(station); // wrong, dont pass the stations
    for loop through inquirer-questions
    return answers and station
    return { station, answers } to make later: station.exec(props);
  */
};

export default StationsToInquirer;
