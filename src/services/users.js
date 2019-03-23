class UserService {
  /**
   * Loads user data by username
   * @param username string value to lookup users by
   * @returns {Promise<*>}
   */
  static async getUserByUserName(username) {
    return users[username];
  }

  /**
   * Checks if a given username and password combination is valid and if so, returns that user
   * @param username string value to lookup the user by
   * @param password string value to check the password against
   * @returns {Promise<boolean>}
   */
  static async verifyPassword(username, password) {
    const user = await UserService.getUserByUserName(username);

    if (user) {
      return user.password === password;
    }

    return false;
  }
}

// Mock data store
const users = {
  'admin': {
    password: 'super-secret',
  },
  'bob': {
    password: 'slash',
  }
}

export default UserService;
