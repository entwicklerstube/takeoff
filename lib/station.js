const fs = require('fs')
const path = require('path')

const getOfficialStations = () => new Promise((resolve, reject) => {
  // console.log('A', );

  fs.readdir(path.resolve(__dirname, '../stations'), (err, files) => {
    // const b = files.filter(file => !/(.DS_Store|_shared)/.test(file))

    console.log(files);
    // var questions = [{
    //   type: 'list',
    //   name: 'station',
    //   message: 'Choose your station',
    //   choices: []
    //   .concat(b)
    //   // if .takeoff folder found in project
    //   .concat([new inquirer.Separator(`Found custom stations in "${process.cwd().split('/').pop()}"`)])
    //   .concat(['A', 'B']),
    //   filter: val => val.toLowerCase()
    // }]
    //
    // inquirer.prompt(questions).then(function (answers) {
    //   console.log('\nOrder receipt:');
    //   console.log(JSON.stringify(answers));
    //   });
    resolve([])
  })
})

module.exports = { getOfficialStations }
