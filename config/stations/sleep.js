module.exports = {
  name: 'Sleep',
  description: 'This is an extrem long thing',
  get: 'age',
  exec: new Promise(resolve => {
    setTimeout(() => {
      console.log('asda');
      resolve();
    }, 1000);
    return '';
  })
};
