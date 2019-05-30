import { reset } from 'kleur';
import stationPrompts from './';

const discoveredStationExample = [
  {
    stationsDir: '.takeoff',
    pathToStation: '/Users/john/Code',
    absolutePath: '/Users/john/Code/.takeoff',
    pathFromHome: 'Code',
    isCurrentWorkingDirectory: true,
    stations: [
      {
        id: '9wPHvXAMQSDZjYWTBKBik',
        name: 'basic-example',
        path: '/Users/john/.takeoff/basic-example.js',
        get: 'name',
        exec: () => {}
      },
      {
        id: 'cj193j123jdkyjefkjefj',
        name: 'advanced-example',
        description: 'Advanced example',
        path: '/Users/john/.takeoff/advanced-example.js',
        get: 'age',
        exec: () => {}
      }
    ]
  },
  {
    stationsDir: '.takeoff',
    pathToStation: '/Users/john/Code/my-project',
    absolutePath: '/Users/john/Code/my-project/.takeoff',
    pathFromHome: 'Code/my-project',
    isCurrentWorkingDirectory: false,
    stations: [
      {
        id: 'j3n9aj3ivkalf1pf94n31',
        name: 'another-example',
        path: '/Users/john/my-project/.takeoff/another-example.js',
        get: 'name',
        exec: () => {}
      }
    ]
  }
];

describe('Library - Station Prompts', () => {
  it('returns a prompts conform choice object', () => {
    const prompts = stationPrompts(discoveredStationExample);

    expect(prompts, 'to be an array');
    expect(prompts[0], 'to have keys', ['title', 'value']);
  });

  it('sets the id of a station as value and name as title', () => {
    const prompts = stationPrompts(discoveredStationExample);

    expect(
      prompts[0].value,
      'to equal',
      discoveredStationExample[0].stations[0].id
    );

    expect(
      prompts[0].title,
      'to equal',
      discoveredStationExample[0].stations[0].name
    );
  });

  it('returns a prompts conform choice object', () => {
    const prompts = stationPrompts(discoveredStationExample);

    expect(prompts, 'to be an array');
    expect(prompts[0], 'to have keys', ['title', 'value']);
  });

  it('returns the title with description if available', () => {
    const prompts = stationPrompts(discoveredStationExample);
    const { name, description } = discoveredStationExample[0].stations[1];

    expect(
      prompts[1].title,
      'to equal',
      `${name}${reset().dim(` · ${description}`)}`
    );
  });

  it('adds the path to station to the query when the station is not from the cwd', () => {
    const prompts = stationPrompts(discoveredStationExample);
    const { pathToStation, stations } = discoveredStationExample[1];
    const { name } = stations[0];

    expect(
      prompts[2].title,
      'to equal',
      `${name}${reset().dim(` (station from ${pathToStation})`)}`
    );
  });
});
