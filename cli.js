#!/usr/bin/env node
const inquirer = require('inquirer');
const updateNotifier = require('update-notifier');
const {green} = require('chalk');
const taskler = require('taskler');
const meow = require('meow');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const cli = meow(`
  Usage
    $ takeoff <station>

  Example
    $ takeoff node-module
`);

const { getStations, loadStationByName } = require('./lib/station');
const { createFilesByList } = require('./lib/wizard');

const getStationId = async stations => {

  if (cli.input.length === 0) {

    return ( await inquirer.prompt(stations)).stationId;
  } else {

    return stations[0].choices.find(({name}) => name === cli.input[0]).value;
  }
};

(async () => {
  try {
    const stationsCollection = await getStations();

    const stationsPathMap = stationsCollection.reduce( (m, s) => ({ ...m, [s.stationsPath]: s}), {});

    let stationChoices = [];

    for( let stationsPath in stationsPathMap ) {

      stationChoices.push(new inquirer.Separator(`Stations from "${stationsPath}"`));

      stationChoices = stationChoices.concat(stationsPathMap[stationsPath]);
    }

    const chooseBetweenAvailableStations = [{
      type: 'list',
      name: 'stationId',
      message: 'What do you want to create?',
      choices: stationChoices
    }];

    const stationId = await getStationId(chooseBetweenAvailableStations);

    const {name, stationsPath} = stationsCollection.find(({value}) => value === stationId);

    const station = await loadStationByName({name, stationsPath});

    const requiredStationProps = [];

    station.requiredProps && station.requiredProps.forEach(prop => {
      if (typeof prop === 'string') {
        requiredStationProps.push({
          type: 'input',
          name: prop,
          message: prop
        });
      } else {
        requiredStationProps.push(prop);
      }
    });

    const stationProps = await inquirer.prompt(requiredStationProps);

    const {files} = station.run(stationProps);

    console.log('🚀  Houston, lift of in 3..2..1');

    const tasks = [];

    if (station.preTakeoff !== undefined) {
      tasks.push({
        title: 'Pre Takeoff',
        task: opts => station.preTakeoff(stationProps, opts)
      });
    }

    tasks.push({
      title: `Created files for station ${name}`,
      task: ({emit, succeed}) => {
        createFilesByList(files, emit).then(succeed);
      }
    });

    if (station.postTakeoff !== undefined) {
      tasks.push({
        title: 'Post Takeoff',
        task: opts => station.postTakeoff(stationProps, opts)
      });
    }

    taskler(tasks, () => {
      console.info(green('🎉  Done'));
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
