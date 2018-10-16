import command from "commander";
import { version } from "./package.json";

import getAvailableStations from "./lib/discover-stations";

(async () => {
  command
    .version(version)
    .option(
      "--import",
      "Import / convert an existing file or hirachy into a station."
    )
    .option("-c, --config", "Define a additional resource for stations.")
    .parse(process.argv);

  if (command.import) {
    console.log("OIDA IMPORT");
    return;
  }

  // remote station

  const availableStations = await getAvailableStations();

  // findStations

  // discover available stations
})();
