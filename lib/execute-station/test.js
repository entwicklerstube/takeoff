import { stationToListr } from './';

describe('Library - Execute Station', () => {
  describe('stationToListr', () => {
    let helloWorldResponse;

    beforeEach(() => {
      [helloWorldResponse] = stationToListr(() => 'hello world');
    });

    it('returns an array', () => {
      expect(stationToListr(), 'to be an array');
    });

    it('returns required title and task props in response', () => {
      expect(helloWorldResponse, 'to be an object');
      expect(helloWorldResponse, 'to have keys', ['title', 'task']);
    });

    it('returns passed function as "task"', () => {
      expect(helloWorldResponse.task(), 'to equal', 'hello world');
    });

    it('returns a default used task title', () => {
      expect(helloWorldResponse.title, 'to equal', 'Executing...');
    });

    it('returns as array passed functions in task valid properties', () => {
      const [fooResponse, barResponse] = stationToListr([
        () => 'foo',
        () => 'bar'
      ]);

      expect(fooResponse, 'to be an object');
      expect(barResponse, 'to be an object');
    });

    it('returns as array passed functions with indexed task names', () => {
      const [fooResponse, barResponse] = stationToListr([
        () => 'foo',
        () => 'bar'
      ]);

      expect(fooResponse.title, 'to equal', 'Job 1/2');
      expect(barResponse.title, 'to equal', 'Job 2/2');
    });

    it('returns as array passed object native listr task', () => {
      const [fooResponse] = stationToListr({
        title: 'Processing FooBar...',
        task: () => 'FooBar'
      });

      expect(fooResponse, 'to be an object');
      expect(fooResponse.title, 'to equal', 'Processing FooBar...');
      expect(fooResponse.task(), 'to equal', 'FooBar');
    });

    it('returns a executed function with passed properties', () => {
      const [greetJohn] = stationToListr(
        {
          title: 'Processing FooBar...',
          task: props => 'Hello ' + props.name
        },
        {
          name: 'John'
        }
      );

      expect(greetJohn.task(), 'to equal', 'Hello John');
    });
  });
});
