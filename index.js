import inquirer from 'inquirer';
import command from 'commander';
import Listr from 'listr';
import assign from 'lodash.assign';

import { version } from './package.json';

import findStations from './lib/find-local-stations';
import stationsToInquirer from './lib/stations-to-inquirer';
import getToInquirer from './lib/get-to-inquirer';

(async () => {
  command
    .version(version)
    .command('takeoff <station>')
    .option('--init', 'Initialize takeoff in the current folder')
    .parse(process.argv);

  switch (true) {
    case command.init: {
      console.log(
        'INIT, creates a .takeoff folder within a easy example station'
      );
      break;
    }

    default: {
      const localStations = await findStations();

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

      // NEXT SCHRITT
      // await executeStation({ station: selectedStation.exec, answers });

      // new Listr([
      //   {
      //     title: 'Execute',
      //     task: (_, task) => selectedStation.exec(assign(...answers), task)
      //   }
      // ]).run();
    }
  }
})();
