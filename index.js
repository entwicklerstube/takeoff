import debug from 'debug';
import prompts from 'prompts';

import { version } from './package.json';

import discoverStations from './lib/discover-stations';
import parseArgv from './lib/parse-argv';
import stationPrompts from './lib/station-prompts';

const log = debug('takeoff:init');

(async () => {
  const { command, flags, props } = parseArgv(process.argv);

  if (flags.stationsFolder) {
    log(`Use custom stations folder ${flags.stationsFolder}`);
  }

  switch (true) {
    case flags.version: {
      console.log(`v${version}`);
      break;
    }

    default: {
      const stations = await discoverStations({
        stationsDir: flags.stationsFolder
      });

      const choices = stationPrompts(stations);

      const selectedStationId = await prompts({
        type: 'select',
        name: 'value',
        message: 'select dude',
        choices
      });

      console.log('selected station', selectedStationId);

      // const selectedStation = await prompts(stationPrompts(stations));

      // console.log(stations[0].stations);

      // prompts([
      //   {
      //     type: 'select',
      //     name: 'value',
      //     message: 'Select a station',
      //     choices: [
      //       ...discoveredStationsFolder[0].stations.map(station => ({
      //         title: `${station.name}${
      //           station.description
      //             ? `${chalk.reset.dim(` · ${station.description}`)}`
      //             : ''
      //         }`,
      //         value: station.id
      //       }))
      //     ]
      //   }
      // ]);

      // console.log(stations[0].stations);

      // const accumulatedStations = [].concat(
      //   ...localStations.map(({ stations }) => stations)
      // );

      // const inquirerStationChoices = stationsToInquirer(localStations);
      // const { selectedStationId } = await inquirer.prompt(
      //   inquirerStationChoices
      // );

      // const selectedStation = accumulatedStations.find(
      //   station => station.id === selectedStationId
      // );

      // const answers = [];
      // const questions = await getToInquirer(selectedStation.get);

      // for (const question of questions) {
      //   const answer = await inquirer.prompt(
      //     await question(assign(...answers))
      //   );
      //   answers.push(answer);
      // }

      // await executeStation(selectedStation.exec, assign(...answers));
    }
  }
})();
