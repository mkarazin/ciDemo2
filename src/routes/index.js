import { Router } from 'express';
import validate from 'express-validation';

import { ParameterValidator } from '../middleware';
import { AuthController } from '../controllers';

const router = new Router();

router.post('/login',
  validate(ParameterValidator.login),
  AuthController.login);

module.exports = router;
