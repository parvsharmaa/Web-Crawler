import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

class UserRoutes {
  constructor(app) {
    this.router = Router();
    this.app = app;
  }

  setupRoutes() {
    this.router.post('/login', UserController.login);

    this.router.post('/register', UserController.register);

    this.app.use('/auth', this.router);
  }
}

export default UserRoutes;
