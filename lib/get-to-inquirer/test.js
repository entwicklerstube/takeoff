import GetToInquirer, { question } from './';

describe('Lib - GetToInquirer', () => {
  describe('question', () => {
    it('returns an object', () => {
      expect(question(), 'to be an object');
    });

    it("returns by default an valid inquirer input prompt, by default it uses 'value' as name", () => {
      expect(question(), 'to equal', {
        type: 'input',
        name: 'value'
      });
    });

    it('allows to overwrite and extend properties by simply passing them', () => {
      expect(
        question({
          name: 'How are you?',
          hint: 'Happy'
        }),
        'to equal',
        {
          type: 'input',
          name: 'How are you?',
          hint: 'Happy'
        }
      );
    });
  });

  describe('GetToInquirer', () => {
    it('returns an array', async () => {
      expect(await GetToInquirer(), 'to be an array');
    });

    it('returns always the properties in the array as promises', async () => {
      const [inquirerQuestionFunction] = await GetToInquirer('foo');

      const promise = inquirerQuestionFunction();
      expect(Promise.resolve(promise), 'to equal', promise);
      expect(promise.then, 'to be a function');
    });

    it('returns a passed string as promise which resolved is an object', async () => {
      const [helloQuestion] = await GetToInquirer('Hello');
      const response = await helloQuestion();

      expect(response, 'to equal', {
        type: 'input',
        name: 'Hello'
      });
    });

    it('returns multiple promises in array when passing an array', async () => {
      const [helloQuestion, worldQuestion] = await GetToInquirer([
        'Hello',
        'World'
      ]);

      const helloResponse = await helloQuestion();
      const worldResponse = await worldQuestion();

      expect(helloResponse.name, 'to equal', 'Hello');
      expect(worldResponse.name, 'to equal', 'World');
    });

    it('returns resolved function returning a string', async () => {
      const [cityQuestion] = await GetToInquirer([
        city => `Hello from ${city}`
      ]);

      const cityResponse = await cityQuestion('munich');

      expect(cityResponse.name, 'to equal', 'Hello from munich');
    });

    it('returns resolved function returning an array', async () => {
      const [cityQuestion] = await GetToInquirer([
        city => [`Hello from ${city}`]
      ]);

      const cityResponse = await cityQuestion('munich');

      expect(cityResponse.name, 'to equal', 'Hello from munich');
    });

    it('returns resolved function returning a promise returning an array', async () => {
      const [cityQuestion] = await GetToInquirer([
        async city => [`Hello from ${city}`]
      ]);

      const cityResponse = await cityQuestion('munich');

      expect(cityResponse.name, 'to equal', 'Hello from munich');
    });

    it('returns resolved function returning a promise returning a function', async () => {
      const [cityQuestion] = await GetToInquirer([
        async city => () => [`Hello from ${city}`]
      ]);

      const cityResponse = await cityQuestion('munich');

      expect(cityResponse.name, 'to equal', 'Hello from munich');
    });

    it('returns resolved object replaced specific inquirer object properties', async () => {
      const [serverPasswordQuestion] = await GetToInquirer({
        type: 'password',
        name: 'server-password'
      });

      const serverPasswordResponse = await serverPasswordQuestion();

      expect(serverPasswordResponse.name, 'to equal', 'server-password');
    });

    it('returns resolved number', async () => {
      const [numberQuestion, leetQuestion] = await GetToInquirer([42, 1337]);

      const numberResponse = await numberQuestion();
      const leetResponse = await leetQuestion();

      expect(numberResponse.name, 'to equal', 42);
      expect(leetResponse.name, 'to equal', 1337);
    });

    it('returns resolved Date', async () => {
      const now = new Date();
      const [numberQuestion] = await GetToInquirer(now);

      const numberResponse = await numberQuestion();

      expect(numberResponse.name, 'to equal', now);
    });
  });
});
