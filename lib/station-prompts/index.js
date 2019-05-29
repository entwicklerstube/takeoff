import kleur from 'kleur';

/**
 * Convert found stations into "choices" for "prompts" lib
 * @param {array} stationFolders
 * @returns {array}
 */
export const StationPrompts = (stationFolders = []) => {
  const prompts = [];

  stationFolders.forEach(
    ({ stations, isCurrentWorkingDirectory, pathToStation }) => {
      stations.forEach(station => {
        prompts.push({
          value: station.id,
          title: `${station.name}${
            station.description
              ? `${kleur.reset().dim(` · ${station.description}`)}`
              : ''
          }${
            isCurrentWorkingDirectory
              ? ''
              : kleur.reset().dim(` (station from ${pathToStation})`)
          }`
        });
      });
    }
  );

  return prompts;
};

export default StationPrompts;
