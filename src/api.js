import express from 'express';
import bodyParser from 'body-parser';

import ErrorHandlers from './utils/errorHandlers';
import { log } from './utils/logger';

export const InitAPI = () => {
  const api = express();

  // Enable support for JSON parsing of body arguments
  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded({
    extended: true,
  }));

  // Log all incoming requests
  api.use((req, res, next) => {
    log.info(`API Request: ${req.method} | ${req.url} | ${req.ip} | ${req.get('User-Agent')}`);
    next();
  });

  // Hook up our routes
  api.use('/', require('./routes'));

  // If any route throws a ValidationError, this middleware will handle it
  api.use(ErrorHandlers.ParameterValidationErrorHandler);

  // Handle Errors
  api.use((err, req, res, next) => {
    // Log the request with error noted
    log.error('ERROR - %s, %s', req.method, req.url);

    // Log the Error
    log.error(err.stack);

    // Return 500 error code
    res.status(500).send({ message: 'Error' });
  });

  // Handle 404s
  api.use((req, res, next) => {
    res.status(404).send({
      message: "Houston, we've had a problem here",
      urlRequested: `${req.method} ${req.url}`,
    });
  });

  return api;
};