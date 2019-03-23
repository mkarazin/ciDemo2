import * as bunyan from 'bunyan';

const log = bunyan.createLogger(
  {
    name: 'demoAPI',
    level: 'info',
    streams: [
      {
        level: 'info',
        stream: process.stdout,
      },
      {
        level: 'error',
        path: 'error.log',
      },
    ],
  },
);

module.exports = {
  log,
};
