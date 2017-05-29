#!/usr/bin/env node
const inquirer = require('inquirer');

// Enable when published to npm
// const updateNotifier = require('update-notifier');
// const pkg = require('./package.json');
//
// updateNotifier({pkg}).notify();

const {getPredefinedStations, getCustomStations, loadStationByName} = require('./lib/station');

(async () => {
  const predefinedStations = await getPredefinedStations();
  const customStations = await getCustomStations();
  const seperator = [];

  if (customStations.length > 0) {
    seperator.push(new inquirer.Separator(`Found custom stations in "${process.cwd().split('/').pop()}"`));
  }

  const chooseBetweenAvailableStations = [{
    type: 'list',
    name: 'stationName',
    message: 'What do you want to create?',
    choices: []
      .concat(predefinedStations)
      .concat(seperator)
      .concat(customStations)
  }];

  const {stationName} = await inquirer.prompt(chooseBetweenAvailableStations);

  const station = await loadStationByName(stationName);

  console.log('ok the station is', station);

  // Const answerCustomStationQuestions = []
})();

//   Const b = files.filter(file => !/(.DS_Store|_shared)/.test(file))
//
//   var questions = [{
//     type: 'list',
//     name: 'station',
//     message: 'Choose your station',
//     choices: []
//     .concat(b)
//     // if .takeoff folder found in project
//     .concat([new inquirer.Separator(`Found custom stations in "${process.cwd().split('/').pop()}"`)])
//     .concat(['A', 'B']),
//     filter: val => val.toLowerCase()
//   }]
//
//   inquirer.prompt(questions).then(function (answers) {
//     console.log('\nOrder receipt:');
//     console.log(JSON.stringify(answers));
//     });
// })

// const tasks = new Listr([{
//   title: 'Git',
// 	task: () => new Promise((resolve) => {
//     setTimeout(() => resolve(), 1000)
//   })
// },{
//   title: 'bar',
// 	task: () => new Promise((resolve) => {
//     setTimeout(() => resolve(), 2000)
//   })
// }]);
//
// tasks.run().catch(err => {
// 	console.error(err);
// });
