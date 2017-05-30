const map = require('p-map');
const {outputFile} = require('fs-extra');

const createFile = ({filename, template}) => new Promise((resolve, reject) => {
  outputFile(filename, template)
    .then(() => {
      resolve(filename);
    })
    .catch(reject);
});

const createFilesByList = (files, emit) => new Promise(resolve => {
  map(files, file => createFile(file).then(filename => {
    emit(filename);
    return filename;
  })
  ).then(resolve);
});

module.exports = {createFile, createFilesByList};
