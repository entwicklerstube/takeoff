#!/usr/bin/env node
const inquirer = require('inquirer');
const updateNotifier = require('update-notifier');
const PrettyError = require('pretty-error');
const pkg = require('./package.json');

const {render} = new PrettyError();

updateNotifier({pkg}).notify();

const {getPredefinedStations, getCustomStations, loadStationByName} = require('./lib/station');

(async () => {
  try {
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

    const station = await loadStationByName(stationName, 'stations');

    console.log('ok the station is', station);

    const answerCustomStationQuestions = [];

    station.requiredProps.forEach(prop => {
      answerCustomStationQuestions.push({
        type: 'input',
        name: prop,
        message: `Fill: ${prop}`
      });
    });

    const stationProps = await inquirer.prompt(answerCustomStationQuestions);

    console.log(
      station.run(stationProps)
    );
  } catch (err) {
    // Console.log('🚫', err.toString().replace(/^Error:/, ''));
    const renderedError = render(err);
    console.log(renderedError);
  }
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
