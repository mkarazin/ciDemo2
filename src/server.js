import { InitAPI } from './api';
import { log } from './utils/logger';

const api = InitAPI();
const port = 3000;

// listen for http verbs
const server = api.listen(port, () => {
  log.info(`Server starting on port ${port}`);
});

/**
 * Note: any rejections handled here should be investigated and handled directly in the calling code
 * This is only to warn you during development that something is not setup correctly
 */
process.on('unhandledRejection', (error, promise) => {
  log.error('UnhandledRejection caught by global unhandled Promise Rejection handler');
  log.error(error);
});
