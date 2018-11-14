import StationsToInquirer from './';
import inquirer from 'inquirer';
import chalk from 'chalk';

describe('Library - Stations to Inquirer', () => {
  describe('StationsToInquirer', () => {
    it('returns an object', () => {
      expect(StationsToInquirer(), 'not to be an array');
      expect(StationsToInquirer(), 'to be an object');
    });

    it('returns all required inquirer keys for a prompt', () => {
      expect(StationsToInquirer(), 'to have keys', [
        'type',
        'name',
        'message',
        'choices'
      ]);
    });

    it('returns the inquirer-question with type list', () => {
      expect(StationsToInquirer().type, 'to equal', 'list');
    });

    it('returns the station name found in the station-dir', () => {
      const stationsList = StationsToInquirer([
        {
          stationsDir: '.takeoff',
          pathToStation: '/Users/user/Code/project-x',
          absolutePath: '/Users/user/Code/project-x/.takeoff',
          pathFromHome: 'Code/takeoff',
          isCurrentWorkingDirectory: true,
          stations: [
            {
              name: 'Get my firstname'
            }
          ]
        }
      ]);

      expect(stationsList.choices[0].name, 'to equal', 'Get my firstname');
    });

    describe('handles stations from different directories', () => {
      const stationsList = StationsToInquirer([
        {
          stationsDir: '.takeoff',
          pathToStation: '/Users/user/Code',
          absolutePath: '/Users/user/Code/.takeoff',
          pathFromHome: 'Code',
          isCurrentWorkingDirectory: false,
          stations: [
            {
              name: 'Return my IP'
            }
          ]
        },
        {
          stationsDir: '.takeoff',
          pathToStation: '/Users/user/Code/project-x',
          absolutePath: '/Users/user/Code/project-x/.takeoff',
          pathFromHome: 'Code/takeoff',
          isCurrentWorkingDirectory: true,
          stations: [
            {
              name: 'Get my firstname'
            }
          ]
        }
      ]);

      it('returns the station with a seperator if stations from two different stations are available', () => {
        expect(
          stationsList.choices[0],
          'to equal',
          new inquirer.Separator('~/Code/takeoff')
        );
        expect(stationsList.choices[1].name, 'to equal', 'Get my firstname');
        expect(
          stationsList.choices[2],
          'to equal',
          new inquirer.Separator('~/Code')
        );
        expect(stationsList.choices[3].name, 'to equal', 'Return my IP');
      });

      it('returns the found station with description', () => {
        const stationsList = StationsToInquirer([
          {
            stations: [
              {
                name: 'Get my firstname',
                description: 'Station which logs my firstname'
              }
            ]
          }
        ]);

        expect(
          stationsList.choices[0].name,
          'to equal',
          `Get my firstname · ${chalk.grey('Station which logs my firstname')}`
        );
      });
    });
  });
});
