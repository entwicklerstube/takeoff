#!/usr/bin/env node
const inquirer = require('inquirer')

const { getOfficialStations } = require('./lib/station')

const TakeOff = async () => {
  const officialStations = await getOfficialStations()

  const takeOffSteps = [{
    type: 'list',
    name: 'station',
    message: 'Choose your station',
    choices: []
      .concat(officialStations)
  }]

  const answers = await inquirer.prompt(takeOffSteps)

  console.log('-------', answers);
}

TakeOff()



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
