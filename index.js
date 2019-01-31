import inquirer from 'inquirer';
import command from 'commander';
import assign from 'lodash.assign';

import { version } from './package.json';

import findLocalStations from './lib/find-local-stations';
import stationsToInquirer from './lib/stations-to-inquirer';
import getToInquirer from './lib/get-to-inquirer';
import executeStation from './lib/execute-station';

(async () => {
  command
    .version(version)
    // .command('takeoff <station>')
    .option('--init', 'Initialize takeoff in the current folder')
    .option(
      '--stations-folder [path]',
      'Pass a custom path where takeoff should search for stations'
    )
    .parse(process.argv);

  switch (true) {
    case command.init: {
      console.log('Work in progress...');
      break;
    }

    default: {
      const localStations = await findLocalStations({
        stationsDir: command.stationsFolder
      });

      const accumulatedStations = [].concat(
        ...localStations.map(({ stations }) => stations)
      );

      const inquirerStationChoices = stationsToInquirer(localStations);
      const { selectedStationId } = await inquirer.prompt(
        inquirerStationChoices
      );

      const selectedStation = accumulatedStations.find(
        station => station.id === selectedStationId
      );

      const answers = [];
      const questions = await getToInquirer(selectedStation.get);

      for (const question of questions) {
        const answer = await inquirer.prompt(
          await question(assign(...answers))
        );
        answers.push(answer);
      }

      await executeStation(selectedStation.exec, answers);
    }
  }
})();
