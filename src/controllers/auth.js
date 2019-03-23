import ResponseObjects from '../utils/responseObjects';

import {
  UserService
} from '../services';

class AuthController {
  static async login(req, res, next) {
    // Parameters are validated by a prior middleware
    const {
      username,
      password,
    } = req.body;

    // Load the user by the username and password
    const user = await UserService.verifyPassword(username, password);

    // Return the result to the requester
    if (user) {
      ResponseObjects.Success(res, { token: 'zajekjcd' });
    } else {
      ResponseObjects.InvalidLogin(res);
    }
  }
}

export default AuthController;
