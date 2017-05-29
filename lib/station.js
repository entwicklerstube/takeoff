const fs = require('fs')
const path = require('path')

const getPredefinedStations = () => new Promise((resolve, reject) => {
  const stationsFolder = path.resolve(__dirname, '../stations')

  fs.readdir(stationsFolder, (err, files = []) => {
    if (err) reject(err)
    resolve(
      files
        .filter(file => !/.DS_Store|_shared/.test(file))
        .filter(file => fs.lstatSync(path.join(stationsFolder, file)).isDirectory())
      )
  })
})

const getCustomStations = () => new Promise((resolve, reject) => {
  const stationsFolder = path.resolve(process.cwd(), '.takeoff')
  if (fs.existsSync(stationsFolder)) {
    fs.readdir(stationsFolder, (err, files = []) => {
      if (err) reject(err)
      resolve(files.filter(file => fs.lstatSync(path.join(stationsFolder, file)).isDirectory()))
    })
  } else {
    resolve([])
  }
});

module.exports = { getPredefinedStations, getCustomStations }
