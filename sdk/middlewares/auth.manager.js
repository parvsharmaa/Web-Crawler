class AuthManager {
  // private class fields
  static #instance = null;
  #token = null;

  static getInstance() {
    if (!AuthManager.#instance) {
      AuthManager.#instance = new AuthManager();
    }
    return AuthManager.#instance;
  }

  setToken(token) {
    this.#token = token;
  }

  getToken() {
    return this.#token;
  }
}

export default AuthManager;
