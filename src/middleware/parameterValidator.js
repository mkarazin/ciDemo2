import Joi from 'joi';

export default {
  // POST /login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
