const path = require('path');
const fs = require('fs');

function checkRoot(checkPath, folder) {

  return new Promise( (resolve) => {
    fs.exists(path.resolve(checkPath, folder), resolve);
  });
}

async function findRoot(startPath, folder) {

  if ( await checkRoot(startPath, folder) ) {
    return startPath;
  }

  const parentPath = path.resolve(startPath, '..');

  if(parentPath === startPath) {
    throw new Error(`No ${folder} found in parent paths.`);
  }

  return findRoot(parentPath , folder);
}

async function findRoots(startPath, folder) {

  const roots = [];
  let currentPath = startPath;

  try {
    while( currentPath !== '/' ) {

      const foundPath = await findRoot(currentPath, folder);

      roots.push( foundPath );
      currentPath = path.resolve(foundPath, '..');
    }
  } catch (e) {

    if (roots.length > 0) {
      return roots;
    }

    throw e;
  }

}

module.exports = {
  findRoot,
  findRoots
};
