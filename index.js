import command from "commander";
import { version } from "./package.json";

import findStations from "./lib/find-local-stations";

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
    case command.import:
      console.log("IMPORT");
      break;

    case command.init:
      console.log("INIT");
      break;

    default:
      const localStations = await findStations();
      console.log(localStations);
  }
})();
