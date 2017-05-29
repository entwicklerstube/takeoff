#!/usr/bin/env node
const Listr = require('listr');
const inquirer = require('inquirer')
const fs = require('fs')
const exec = require('child_process').exec;

const { getOfficialStations } = require('./lib/station')

getOfficialStations().then(() => {
  console.log('hey');
})

fs.readdir(__dirname + '/stations', (err, files) => {
  const b = files.filter(file => !/(.DS_Store|_shared)/.test(file))

  var questions = [{
    type: 'list',
    name: 'station',
    message: 'Choose your station',
    choices: []
    .concat(b)
    // if .takeoff folder found in project
    .concat([new inquirer.Separator(`Found custom stations in "${process.cwd().split('/').pop()}"`)])
    .concat(['A', 'B']),
    filter: val => val.toLowerCase()
  }]

  inquirer.prompt(questions).then(function (answers) {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers));
    });
})




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
