import ParseArgv from './';

describe('Library - Parse Argv', () => {
  describe('handle command', () => {
    it('defines the first passed word as command', () => {
      const { command } = ParseArgv([
        '/Users/john/node',
        '/Users/john/foo.js',
        'init'
      ]);

      expect(command, 'to equal', 'init');
    });
  });

  describe('handle flags', () => {
    it('moves found flag into flags object and set by default to true value', () => {
      const { flags } = ParseArgv([
        '/Users/john/node',
        '/Users/john/foo.js',
        '--enabled'
      ]);

      expect(flags.enabled, 'to be true');
    });

    it('uses the item after the flag as value', () => {
      const { flags } = ParseArgv([
        '/Users/john/node',
        '/Users/john/foo.js',
        '--user',
        'john'
      ]);

      expect(flags.user, 'to equal', 'john');
    });

    it('uses the item after the flag as value', () => {
      const { flags } = ParseArgv([
        '/Users/john/node',
        '/Users/john/foo.js',
        '--enabled',
        '--user',
        'john'
      ]);

      expect(flags.enabled, 'to be true');
      expect(flags.user, 'to equal', 'john');
    });
  });

  describe('handle props', () => {
    it('sets prop by passing a arg with an equal', () => {
      const { props } = ParseArgv([
        '/Users/john/node',
        '/Users/john/foo.js',
        'name=john',
        'asd=foo'
      ]);

      expect(props.name, 'to equal', 'john');
    });
  });
});
