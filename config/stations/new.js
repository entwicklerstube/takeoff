module.exports = {
  name: 'New',
  description: 'If everything is cool this station will be shown',
  get: 'age',
  exec: ({ age }, task) =>
    new Promise(resolve => {
      task.output = 'Ready to calc';
      setTimeout(() => {
        task.output = 'Age is calculated!';

        setTimeout(() => {
          task.output = 'Done';
          resolve();
        }, 1000);
      }, 1500);
    })
};
