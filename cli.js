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

const {getPredefinedStations, getCustomStations, loadStationByName} = require('./lib/station');
const {createFilesByList} = require('./lib/wizard');

const getStationId = stations => new Promise(resolve => {
  if (cli.input.length === 0) {
    inquirer.prompt(stations).then(({stationId}) => resolve(stationId));
  } else {
    resolve(stations[0].choices.find(({name}) => name === cli.input[0]).value);
  }
});

(async () => {
  try {
    // const projectStations = await loadProjectStations();
    

    const predefinedStations = await getPredefinedStations();
    const customStations = await getCustomStations();
    const stationsCollection = [].concat(predefinedStations).concat(customStations);
    const seperator = [];

    if (customStations.length > 0) {
      seperator.push(new inquirer.Separator(`Found custom stations in "${process.cwd().split('/').pop()}"`));
    }

    const chooseBetweenAvailableStations = [{
      type: 'list',
      name: 'stationId',
      message: 'What do you want to create?',
      choices: []
        // .concat(projectStations)
        .concat(predefinedStations)
        .concat(seperator)
        .concat(customStations)
    }];

    const stationId = await getStationId(chooseBetweenAvailableStations);

    const {name, type} = stationsCollection.find(({value}) => value === stationId);

    const station = await loadStationByName({name, type});

    const requiredStationProps = [];

    station.requiredProps.forEach(prop => {
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
      title: `Create files for station ${name}`,
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
  }
})();
