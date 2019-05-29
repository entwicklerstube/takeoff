module.exports = {
  name: 'Get name',
  description: 'Ask for user details',
  get: [
    'Firstname',
    'Lastname',
    () => 'Age',
    (a, b) =>
      new Promise(resolve =>
        setTimeout(() => {
          console.log(3, a, b);
          resolve(() => 'Gender');
        }, 500)
      )
  ],
  exec: function() {
    console.log('Hello World!');
  }
};
