import inquirer from "inquirer";
import command from "commander";

import { version } from "./package.json";

import findStations from "./lib/find-local-stations";
import stationsToInquirer from "./lib/stations-to-inquirer";

(async () => {
  command
    .version(version)
    .command("takeoff <station>")
    .option(
      "--import",
      "Import / convert an existing file or hirachy into a station."
    )
    .option("--init", "Initialize takeoff in the current folder")
    .parse(process.argv);

  switch (true) {
    case command.import: {
      console.log(
        "IMPORT, pass path of a file/folder and we will move it to the stationPath (can also be passed)"
      );
      break;
    }

    case command.init: {
      console.log(
        "INIT, creates a .takeoff folder within a easy example station"
      );
      break;
    }

    default: {
      const localStations = await findStations();

      const inquirerChoices = stationsToInquirer(localStations);
      const { selectedStationId } = await inquirer.prompt(inquirerChoices);

      const accumulatedStations = [].concat(
        ...localStations.map(({ stations }) => stations)
      );

      const selectedStation = accumulatedStations.find(
        station => station.id === selectedStationId
      );

      console.log(selectedStation);

      // const stationGetChoices = getToInquirer(selectedStation.get);

      /*
      // The CLI Interface relays on the awesome API of inquirer, this module converts the station-data into the CLI prompts
      // Execute this if a user runs takeoff without arguments
      const { station, props } = await stationsToInquirer(localStations);

      // Now we know what station we want to execute with what properties, try it! Show a indicator
      console.log(
        "we want to execute the station with the props",
        executeStation
      );

      // Resolve the exec, this works also if the exec is not a promise
      await Promise.resolve(station.exec.bind(props));

      process.stdout.write('Yay, we`re done');

      */
    }
  }
})();
