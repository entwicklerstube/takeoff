import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Pass the detected stations and it will return the inquirer-conform array to give the user a selection
 * @param {array} StationDirs is an array within informations about the takeoff folder and the containing stations
 * @returns {array} InquirerConform list for the `inquirer.prompt`
 */
export const StationsToInquirer = (stationDirs = []) => {
  const choices = [];
  const useSeperators = stationDirs.length > 1;

  stationDirs
    .sort((a, b) => b.isCurrentWorkingDirectory - a.isCurrentWorkingDirectory) // cwd should be on top
    .forEach(stationDir => {
      if (useSeperators) {
        choices.push(new inquirer.Separator(`~/${stationDir.pathFromHome}`));
      }

      stationDir.stations.forEach(station => {
        const stationChoice = [station.name];

        if (station.description) {
          stationChoice.push(chalk.grey(station.description));
        }

        choices.push({
          name: stationChoice.join(' · '),
          value: station.id
        });
      });
    });

  return {
    type: 'list',
    name: 'selectedStationId',
    message: 'Select your station',
    choices
  };
};

export default StationsToInquirer;
