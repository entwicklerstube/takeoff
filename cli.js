#!/usr/bin/env node
const inquirer = require('inquirer')

const { getPredefinedStations, getCustomStations } = require('./lib/station')

const TakeOff = async () => {
  const predefinedStations = await getPredefinedStations()
  const customStations = await getCustomStations()
  const seperator = []

  if (customStations.length > 0) {
    seperator.push(new inquirer.Separator(`Found custom stations in "${process.cwd().split('/').pop()}"`))
  }

  const takeOffSteps = [{
    type: 'list',
    name: 'station',
    message: 'Choose your station',
    choices: []
      .concat(predefinedStations)
      .concat(seperator)
      .concat(customStations)
  }]

  const answers = await inquirer.prompt(takeOffSteps)

  console.log('-------', answers);
}

TakeOff()

//   const b = files.filter(file => !/(.DS_Store|_shared)/.test(file))
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
