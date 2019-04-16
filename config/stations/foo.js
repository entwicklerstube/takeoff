const got = require('got');

module.exports = {
  name: 'Echo my name',
  description: 'Asks for firstname and lastname and prints it afterwards.',
  get: [
    { name: 'firstname', message: 'Whats your firstname?' },
    () =>
      new Promise(async resolve => {
        const { body: users } = await got(
          'https://jsonplaceholder.typicode.com/users',
          {
            json: true
          }
        );

        resolve({
          name: 'userId',
          message: 'What user?',
          type: 'list',
          choices: users.map(user => ({
            name: user.name,
            value: user.id
          }))
        });
      }),
    ({ userId }) =>
      new Promise(async resolve => {
        const { body: comments } = await got(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          {
            json: true
          }
        );

        resolve({
          name: 'commentId',
          message: 'Select a comment of a user',
          type: 'list',
          choices: comments.map(comment => ({
            name: comment.title,
            value: comment.id
          }))
        });
      }),
    ({ firstname }) => ({
      name: 'lastname',
      message: `Cool ${firstname}, and whats your lastname?`
    })
  ],
  exec: ({ firstname, lastname }) =>
    console.log('Your name is:', firstname, lastname)
};
