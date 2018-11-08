import inquirer from "inquirer";
import chalk from "chalk";

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

  // Capsle functions so we can execute them in runtime with new props
  // also fetch the first returned item to build a question
  const functionWrapper = fn => props => getToQuestions(fn(props))[0];

  switch (true) {
    case getConstructor === String: {
      return buildQuestions.concat(buildQuestion({ name: get }));
    }

    case getConstructor === Array: {
      return buildQuestions.concat(
        ...get.map(getItem => getToQuestions(getItem))
      );
    }

    case getConstructor === Object: {
      return buildQuestions.concat([buildQuestion(get)]);
    }

    case getConstructor === Function: {
      return buildQuestions.concat([functionWrapper(get)]);
    }

    default: {
      return buildQuestions;
    }
  }
};

/**
 * Pass the detected stations and it will return the inquirer-conform prompt-array to give the user a selection
 * @param {array} StationDirs is an array within informations about the takeoff folder and the containing stations
 * @example
 * const h = 'asd';
 * @returns {array} InquirerConform list of prompts
 */
export const stationSelection = (stationDirs = [], config = {}) => {
  /*
  - add "onlyCwd" flag
  */
  const choices = [];
  const useSeperators = stationDirs.length > 1;

  stationDirs
    .sort((a, b) => b.isCurrentWorkingDirectory - a.isCurrentWorkingDirectory) // cwd should be on top
    .forEach(stationDir => {
      if (useSeperators) {
        choices.push(new inquirer.Separator(stationDir.pathFromHome));
      }

      stationDir.stations.forEach(station => {
        const stationChoice = [station.name];

        if (station.description) {
          stationChoice.push(chalk.grey(station.description));
        }

        choices.push(stationChoice.join(" · "));
      });
    });

  return {
    type: "list",
    name: "selectedStations",
    message: "Select your station",
    choices
  };
};

/**
 * Pass the stations and StationsToInquirer will start interactive prompts
 * @param {array} Stations
 */
const StationsToInquirer = stationDirs => {
  const inquirerStationQuestions = stationSelection(stationDirs);

  inquirer.prompt(inquirerStationQuestions);

  /*
    const inquirerGetQuestions = getToQuestions(station); // wrong, dont pass the stations
    for loop through inquirer-questions
    return answers and station
    return { station, answers } to make later: station.exec(props);
  */
};

export default StationsToInquirer;
